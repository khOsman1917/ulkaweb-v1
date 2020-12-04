/*
*  __  __                    __
* |  \/  |                  / _|
* | \  / | ___   ___  _ __ | |_ _ __ ___   __ _
* | |\/| |/ _ \ / _ \| '_ \|  _| '__/ _ \ / _` |
* | |  | | (_) | (_) | | | | | | | | (_) | (_| |
* |_|  |_|\___/ \___/|_| |_|_| |_|  \___/ \__, |
*                                          __/ |
*                                         |___/
* MOONFROG LABS CONFIDENTIAL
* __________________
*
* [2013 - [2023] Moonfrog Labs Pvt Ltd
* All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Moonfrog Labs Pvt Ltd and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Moonfrog Labs Pvt Ltd
* and its suppliers and may be covered by U.S. and Foreign Patents,
* patents in process, and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Moonfrog Labs Pvt Ltd.
*
*/

const _ALLOWED_PLATFORMS = ['tpg', 'fb', 'ulka'];

//
// Modes available/supported
//
const MODE_FULL = 0;		// Full game with user, game
const MODE_MINI = 1;		// Only game with lobby, no user management as such
const MODE_MICRO = 2;		// Only game without lobby

const _SETTINGS = {
	"tpg": {
		"isPaymentsAvailable": false,
		"isLeaguesAvailable": false,
		"mode": MODE_MINI
	},
	"fb": {
		"isPaymentsAvailable": true,
		"isLeaguesAvailable": true,
		"mode": MODE_FULL
	}
};

function SignedPlayerInfoInterface(id, sig, digest) {
	this.id = id;
	this.token = sig;
	this.digest = digest;
}
SignedPlayerInfoInterface.prototype.getPlayerID = function () {
	return this.id;
};
SignedPlayerInfoInterface.prototype.getSignature = function () {
	return this.token;
};
SignedPlayerInfoInterface.prototype.getDigest = function () {
	return this.digest;
};

function MFIPPlayer(id, name, photo) {
	console.log("player is initializing with " + id + ", " + name + "," + photo);
	this.id = id;
	this.name = name;
	this.photo = photo;
};
MFIPPlayer.prototype.getID = function () { return this.id; };
MFIPPlayer.prototype.getName = function () { return this.name; };
MFIPPlayer.prototype.getPhoto = function () { return this.photo; };
MFIPPlayer.prototype.getSignedPlayerInfoAsync = function (payload) {
	var obj = new SignedPlayerInfoInterface(this.getID(), this.getID());
	return new Promise(function (resolve, reject) {
		resolve(obj);
	});
};
MFIPPlayer.prototype.canSubscribeBotAsync = function () {
	return new Promise(function (resolve, reject) {
		resolve(false);
	});
};
MFIPPlayer.prototype.subscribeBotAsync = function () {
	return new Promise(function (resolve, reject) {
		resolve();
	});
};
MFIPPlayer.prototype.getConnectedPlayersAsync = function () {
	return new Promise(function (resolve, reject) {
		resolve([]);
	});
};

function MFIPContext() { };
MFIPContext.prototype.chooseAsync = function (options) {
	return new Promise(function (resolve, reject) {
		resolve();
	});
};
MFIPContext.prototype.getID = function () {
	return "";
};
MFIPContext.prototype.getType = function () {
	return "";
};

function MFIPPayments() { };
MFIPPayments.prototype.consumePurchaseAsync = function () { };
MFIPPayments.prototype.getCatalogAsync = function () { };
MFIPPayments.prototype.getPurchasesAsync = function () { };
MFIPPayments.prototype.onReady = function () { };
MFIPPayments.prototype.purchaseAsync = function () { };

/**
 * [MFIP: Moonfrog Instant Platform - interface for the instant platform
 * which provides context, player and payments information which can be
 * used in the game accordingly]
 */
function MFInstantPlatform(platformCode) {
	if (!_ALLOWED_PLATFORMS.includes(platformCode)) {
		console.error("MFInstantPlatform: unidentified platform passed " + platformCode);
		return;
	}

	this._interface = undefined;
	this._settings = _SETTINGS[platformCode];

	this.context = undefined;
	this.player = undefined;
	this.payments = undefined;

	var loadCallback = function () {
		if (platformCode == 'fb') {
			if (!FBInstant) {
				console.error("MFInstantPlatform: fb: Cannot find FBInstant, something went wrong in intialization");
				return;
			}
			this._interface = FBInstant;
		}
	};

	if (platformCode == 'fb') {
		var fbinstant = document.createElement('script');
		fbinstant.id = 'fbInstant';
		fbinstant.src = 'https://connect.facebook.net/en_US/fbinstant.6.2.js';
		fbinstant.onload = loadCallback;
		document.body.appendChild(fbinstant);
	} else if (platformCode == 'ulka') {
		// context information to be passed from Platform
		this.context = new MFIPContext();
		// player information to be passed from Platform
		//Coming from index file of the game
		var ulkapid = localStorage.getItem('ULKA_PID');
		var ulkapname = localStorage.getItem('ULKA_PNAME');
		var ulkapphoto = localStorage.getItem('ULKA_PPHOTO');
		this.player = new MFIPPlayer(ulkapid, ulkapname, ulkapphoto);// get from url params
		// payments interface of the platform
		this.payments = new MFIPPayments();
	} else {
		// context information to be passed from Platform
		this.context = new MFIPContext();
		// player information to be passed from Platform
		this.player = new MFIPPlayer("101", "Puspesh", "");		// get from url params
		// payments interface of the platform
		this.payments = new MFIPPayments();
	}
}

MFInstantPlatform.prototype.IsPaymentsAvailable = function () {
	return this._settings["isPaymentsAvailable"];
};
MFInstantPlatform.prototype.IsLeaguesAvailable = function () {
	return this._settings["isLeaguesAvailable"];
};
MFInstantPlatform.prototype.getMode = function () {
	return this._settings["mode"];
};
MFInstantPlatform.prototype.canCreateShortcutAsync = function () {
	if (this._interface) return this._interface.canCreateShortcutAsync();
	return new Promise(function (resolve, reject) {
		resolve(true);
	});
}
MFInstantPlatform.prototype.createShortcutAsync = function () {
	if (this._interface) return this._interface.createShortcutAsync();
	return new Promise(function (resolve, reject) {
		resolve();
	});
}
MFInstantPlatform.prototype.getEntryPointAsync = function () {
	if (this._interface) return this._interface.getEntryPointAsync();
	return new Promise(function (resolve, reject) {
		resolve('entry_0');
	});
}
MFInstantPlatform.prototype.getEntryPointData = function () {
	if (this._interface) return this._interface.getEntryPointData();
	return new Promise(function (resolve, reject) {
		resolve({});
	});
}
MFInstantPlatform.prototype.shareAsync = function (payload) {
	if (this._interface) return this._interface.shareAsync();
	return new Promise(function (resolve, reject) {
		resolve();
	});
}
MFInstantPlatform.prototype.startGameAsync = function () {
	if (this._interface) return this._interface.startGameAsync();
	return new Promise(function (resolve, reject) {
		resolve();
	});
}
MFInstantPlatform.prototype.updateAsync = function (payload) {
	if (this._interface) return this._interface.updateAsync();
	return new Promise(function (resolve, reject) {
		resolve();
	});
}
MFInstantPlatform.prototype.getInterstitialAdAsync = function (placementID) {
	if (this._interface) return this._interface.getInterstitialAdAsync();
	return new Promise(function (resolve, reject) {
		resolve({});
	});
}
MFInstantPlatform.prototype.getLocale = function () {
	if (this._interface) return this._interface.getLocale();
	return "en_US";
}
MFInstantPlatform.prototype.getRewardedVideoAsync = function (placementID) {
	if (this._interface) return this._interface.getRewardedVideoAsync();
	return new Promise(function (resolve, reject) {
		resolve({});
	});
}

MFInstantPlatform.prototype.setLoadingProgress = function (proggress) {
	if (this._interface) {
		return this._interface.setLoadingProgress(proggress);
	}
	console.log("setting loading process:: " + proggress);
	return proggress;
}

MFInstantPlatform.prototype.getSupportedAPIs = function () {
	return [
		'initializeAsync',
		'getLocale',
		'getSupportedAPIs',
		'getInterstitialAdAsync',
		'canCreateShortcutAsync',
		'updateAsync',
		'startGameAsync',
		'createShortcutAsync',
		'shareAsync',
		'getEntryPointData',
		'getEntryPointAsync',
		'player.getID',
		'context.getType',
		'context.chooseAsync',
		'context.getID',
		'context.getType',
		'payments.consumePurchaseAsync',
		'payments.getCatalogAsync',
		'payments.getPurchasesAsync',
		'payments.onReady',
		'payments.purchaseAsync',
		'player.getID',
		'player.getName',
		'player.getPhoto',
		'player.getSignedPlayerInfoAsync',
		'player.canSubscribeBotAsync',
		'player.subscribeBotAsync',
		'player.getConnectedPlayersAsync',
	];
}
MFInstantPlatform.prototype.logEvent = function (eventName, valueToSum, params) {
	if (this._interface) return this._interface.logEvent();
	return;
}
MFInstantPlatform.prototype.initializeAsync = function () {
	if (this._interface) return this._interface.initializeAsync();
	return new Promise(function (resolve, reject) {
		resolve();
	});
};

// if (MFIP_PLATFORM_CODE) {
// 	window.FBInstant = new MFInstantPlatform(MFIP_PLATFORM_CODE);
// } else {
// 	console.error("MFInstantPlatform: MFIP_PLATFORM_CODE is missing.");
// }

