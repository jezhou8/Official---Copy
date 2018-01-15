/*

 * @ TIME UI Element

 */

(function () {

	// local variables
	var start_tracking = false;
	var month;
	var day;
	var hours;

	var _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
		_Scene_Map_start.call(this);

		// add window to Scene
		this._timeWindow = new Time_Window(300, 0);
		this.addWindow(this._timeWindow);
	};

	var _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.call(this);
		
		this._timeWindow.refresh();
	};

	function Time_Window() {
		this.initialize.apply(this, arguments);
	}

	Time_Window.prototype = Object.create(Window_Base.prototype);
	Time_Window.prototype.constructor = Time_Window;

	Time_Window.prototype.initialize = function(x, y){
		Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
		
		if (!start_tracking){
			$gameVariables.setValue(20, 1);
			$gameVariables.setValue(19, 8);
			$gameVariables.setValue(18, 7);
			
			$gameSwitches.setValue(1, true);

			start_tracking = true;
		}

		this.refresh();
	};

	Time_Window.prototype.refresh = function() {
		this.contents.clear();

		month = $gameVariables.value(20);
		day = $gameVariables.value(19);
		hours = $gameVariables.value(18);

		this.drawText(month + "/" + day + "\t" + hours + ":00", 0, 0, this.windowWidth());
	};

	Time_Window.prototype.windowWidth = function() {
		return 200;
	};
	Time_Window.prototype.windowHeight = function() {
		return this.fittingHeight(1);
	};

})();