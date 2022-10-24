import {AdvancedDynamicTexture} from "babylonjs-gui/2D/advancedDynamicTexture";

AdvancedDynamicTexture.prototype.getControlByName = function (name) {
	let foundControl = null;
	if (name) {
		this.executeOnAllControls(function (control) {
			if (control.name && control.name === name) {
				foundControl = control;
			}
		}, this._rootContainer);
	}
	return foundControl;
}



