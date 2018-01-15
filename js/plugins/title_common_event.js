/*:
* @plugindesc (Make sure CommonEvent has no trigger, scriptcall: SceneManager.push(Scene_Title) to exit )
* @author Jorel Mayer
*
* @param commonId
* @desc The ID of the Common Event you want to run.
* @default 
*
* @param titleMenuName
* @desc the name of the command(won't affect mogs picture commands).
* @default Name
*
* @param mapId
* @desc Id of the map it will run the common event (I suggest a 1 * 1 transparent map for loading speed)
* @default 
*
*/

var params = PluginManager.parameters('title_common_event')
var commonId = Number(params['commonId'])
var titleMenuName = String(params['titleMenuName'])
var mapId = Number(params['mapId'])


Window_TitleCommand.makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    Window_TitleCommand.makeCommandList.call(this)
    this.addCommand(titleMenuName, 'commonEvent')
};
Scene_Title.createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    Scene_Title.createCommandWindow.call(this)
    this._commandWindow.setHandler('commonEvent',  this.commandCommonEvent.bind(this));
};

Scene_Title.prototype.commandCommonEvent = function() {
	$gameTemp.reserveCommonEvent(commonId);
	$gamePlayer._opacity = 0
	$gamePlayer.reserveTransfer(mapId,1,1)
	SceneManager.push(Scene_Map)
}
