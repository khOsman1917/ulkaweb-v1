(function () {

    'use strict';

    function boot() {

        var settings = window._CCSettings;
        window._CCSettings = undefined;
        if (!settings.debug) {
            var uuids = settings.uuids;

            var rawAssets = settings.rawAssets;
            var assetTypes = settings.assetTypes;
            var realRawAssets = settings.rawAssets = {};

            for (var mount in rawAssets) {
                var entries = rawAssets[mount];
                var realEntries = realRawAssets[mount] = {};
                for (var id in entries) {
                    var entry = entries[id];
                    var type = entry[1];
                    // retrieve minified raw asset
                    if (typeof type === 'number') {
                        entry[1] = assetTypes[type];
                    }
                    // retrieve uuid
                    realEntries[uuids[id] || id] = entry;
                }
            }

            var scenes = settings.scenes;
            for (var i = 0; i < scenes.length; ++i) {
                var scene = scenes[i];
                if (typeof scene.uuid === 'number') {
                    scene.uuid = uuids[scene.uuid];
                }
            }

            var packedAssets = settings.packedAssets;
            for (var packId in packedAssets) {
                var packedIds = packedAssets[packId];
                for (var j = 0; j < packedIds.length; ++j) {
                    if (typeof packedIds[j] === 'number') {
                        packedIds[j] = uuids[packedIds[j]];
                    }
                }
            }
        }

        function GetDesignResolution() {
            if (cc.sys.isMobile) {
                return (cc.sys.isIpad || cc.sys.ipadRes) ? { width: 768, height: 1024 } : { width: 640, height: 960 };
            }
            return { width: 640, height: 960 };
        }

        // init engine
        var canvas;

        if (cc.sys.isBrowser) {
            canvas = document.getElementById('GameCanvas');
        }

        var onStart = function () {
            cc.view.resizeWithBrowserSize(true);
            // UC browser on many android devices have performance issue with retina display
            if (cc.sys.os !== cc.sys.OS_ANDROID || cc.sys.browserType !== cc.sys.BROWSER_TYPE_UC) {
                cc.view.enableRetina(true);
            }

            if (cc.sys.isMobile) {
                if (settings.orientation === 'landscape') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                }
                else if (settings.orientation === 'portrait') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                }
                // qq, wechat, baidu
                cc.view.enableAutoFullScreen(
                    cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU &&
                    cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT &&
                    cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ
                );

            }

            var res = GetDesignResolution();
            cc.view.setDesignResolutionSize(res.width, res.height, cc.ResolutionPolicy.FIXED_WIDTH);

            // Limit downloading max concurrent task to 2,
            // more tasks simultaneously may cause performance draw back on some android system / brwosers.
            // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
            if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
                cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
            }


            var ua = window.navigator.userAgent + "";
            var isAsus = false;
            if (ua.indexOf("ASUS_") > -1) {
                isAsus = true;
            }
            if (!cc.sys.capabilities["opengl"] || isAsus) {
                var rawAssets = settings.rawAssets;
                var assets = rawAssets["assets"];
                for (var i in assets) {
                    if (assets[i].length > 1) {
                        var keyWord = "SpriteSheets/";
                        var resFolderName = "SpriteSheets4444";
                        if (assets[i][0].indexOf(keyWord) > -1) {
                            var spriteSheetLocation = assets[i][0];
                            var spriteSheetName = spriteSheetLocation.substring(keyWord.length, spriteSheetLocation.length);
                            assets[i][0] = resFolderName + '/' + spriteSheetName;
                        }
                    }
                }
                rawAssets["assets"] = assets;
                settings.rawAssets = rawAssets;
            }

            // init assets
            cc.AssetLibrary.init({
                libraryPath: 'res/import',
                rawAssetsBase: 'res/raw-',
                rawAssets: settings.rawAssets,
                packedAssets: settings.packedAssets,
                md5AssetsMap: settings.md5AssetsMap
            });

            var launchScene = settings.launchScene;
            cc.director.preloadScene(launchScene,
                function () {
                    sendOpenStats(FBInstant.player.getID(), "loading_start");
                    cc.director.loadScene(launchScene,
                        function () {
                            console.log('Success to load scene: ' + launchScene);
                            cc.loader.onProgress = null;
                        }
                    );
                }
            );
        };

        // jsList
        var jsList = settings.jsList;
        var bundledScript = settings.debug ? 'src/project.dev.js' : 'src/project.js';
        if (jsList) {
            jsList = jsList.map(function (x) { return 'src/' + x; });
            jsList.push(bundledScript);
        }
        else {
            jsList = [bundledScript];
        }

        // anysdk scripts
        if (cc.sys.isNative && cc.sys.isMobile) {
            jsList = jsList.concat(['src/anysdk/jsb_anysdk.js', 'src/anysdk/jsb_anysdk_constants.js']);
        }

        var ua = window.navigator.userAgent + "";
        var rendererMode = 0;
        if (ua.indexOf("ASUS_") > -1) {
            rendererMode = 1;
        }

        var option = {
            // width: res.width,
            // height: res.height,
            id: 'GameCanvas',
            scenes: settings.scenes,
            debugMode: settings.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
            showFPS: settings.debug ? true : false,
            frameRate: 60,
            jsList: jsList,
            groupList: settings.groupList,
            collisionMatrix: settings.collisionMatrix,
            renderMode: rendererMode
        };
        cc.game.run(option, onStart);
    }

    var RavenLimiter = {};
    var sendExceptions = Math.random() < 0.5 ? true : false;
    if (window.document) {
        Raven.config((sendExceptions ? 'https://47066c3720a542d888263b18dec885d3@sentry.io/1226070' : false), {
            release: '1204',
            shouldSendCallback: function (data) {
                if (data.message in RavenLimiter && RavenLimiter[data.message] > 100) {
                    return false;
                }
                if (!RavenLimiter[data.message]) {
                    RavenLimiter[data.message] = 0;
                }
                RavenLimiter[data.message]++;
                return true;
            }

        });
        Raven.debug = sendExceptions;
        Raven.install();
        Raven.context(function () {
            var cocos2d = document.createElement('script');
            cocos2d.async = true;
            cocos2d.src = (window._CCSettings && window._CCSettings.debug) ? '//d1f2wnnksnu90e.cloudfront.net/dev-cocos/cocos2d8-js.js.jgz' : '//d1f2wnnksnu90e.cloudfront.net/cocos2d3-js-min.js.jgz';
            var engineLoaded = function () {
                var engineLoadStartTime = Date.now();
                FBInstant.initializeAsync()
                    .then(function () {
                        sendOpenStats(FBInstant.player.getID(), "initializeAsyncDone");
                        globalStartTime += Date.now() - engineLoadStartTime;
                        document.body.removeChild(cocos2d);
                        cocos2d.removeEventListener('load', engineLoaded, false);
                        window.eruda && eruda.init() && eruda.get('console').config.set('displayUnenumerable', false);
                        window.dataLayer = window.dataLayer || [];
                        Raven.setUserContext({
                            id: FBInstant.player.getID()
                        });
                        function gtag() {
                            dataLayer.push(arguments);
                        }
                        gtag('js', new Date());
                        gtag('config', 'UA-45123022-33');
                        FBInstant.setLoadingProgress(1);
                        boot();
                    });
            };
            cocos2d.addEventListener('load', engineLoaded, false);
            document.body.appendChild(cocos2d);
        });
    }

})();
