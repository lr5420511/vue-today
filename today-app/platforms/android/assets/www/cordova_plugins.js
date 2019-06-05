cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-backbutton/www/Backbutton.js",
        "id": "cordova-plugin-backbutton.Backbutton",
        "clobbers": [
            "navigator.Backbutton"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-splashscreen": "5.0.2",
    "cordova-plugin-backbutton": "0.3.0"
};
// BOTTOM OF METADATA
});