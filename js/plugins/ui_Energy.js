/*

 * @ CASH UI Element

 */

(function () {

	// local variables
	var start_tracking = false;
	var energy;

	var _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
		_Scene_Map_start.call(this);

		if(!start_tracking) {
			energy = function(){
				return $gameVariables.value(5);
			};

			$gameVariables.setValue(5, 100);
			start_tracking = true
		}
		// add window to Scene
		this._energyWindow = new My_Window(0, 0);
		this.addWindow(this._energyWindow);
	};

	var _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.call(this);

		this._energyWindow.refresh();
	};

	function My_Window() {
		this.initialize.apply(this, arguments);
	}

	My_Window.prototype = Object.create(Window_Base.prototype);
	My_Window.prototype.constructor = My_Window;

	My_Window.prototype.initialize = function(x, y){
		Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());

		this.refresh();
	};

	My_Window.prototype.refresh = function() {
		this.contents.clear();

		this.drawIcon(263, 0, 0);
		this.drawText(energy(), 0, 0, this.windowWidth(), "center");
	};

	My_Window.prototype.windowWidth = function() {
		return 200;
	};
	My_Window.prototype.windowHeight = function() {
		return this.fittingHeight(1);
	};

})();