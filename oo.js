function defineClass (name, definition) {
	var treeposition = window;
	var parts = name.split(".");
	var classname = parts.pop();
	for (var i = 0; i < parts.length; i++) {
		if (!treeposition[parts[i]]) {
			treeposition[parts[i]] = {};
		}
		treeposition = treeposition[parts[i]];
	}
	var newclass = function () {
		var self = this;
		//superclass
		if (definition.parent) {
			self.parent = {};
			for (superPropname in definition.parent.definition) {
				var superTheprop;
				if (superPropname == "parent") {
					continue;
				}
				superTheprop = definition.parent.definition[superPropname];
				if (typeof theprop === "function") {
					self.parent[superPropname] = function () {
						return superTheprop.apply(self, arguments);
					};
					self[superPropname] = function () {
						return superTheprop.apply(self, arguments);
					};
				} else {
					self.parent[superPropname] = superTheprop;
					self[superPropname] = superTheprop;
				}
			}
			if (definition.parent.definition.initialize && !definition.initialize) {
				definition.parent.definition.initialize.apply(self, arguments);
			}
		}
		//building the class
		for (propname in definition) {
			if (propname === "initialize" || propname === "parent") {
				continue;
			}
			var theprop = definition[propname];
			if (typeof theprop === "function") {
				self[propname] = function () {
					return theprop.apply(self, arguments);
				};
			} else {
				self[propname] = theprop;
			}
		}
		if (definition.initialize) {
			definition.initialize.apply(self, arguments);
		}
	}
	newclass.definition = definition;
	treeposition[classname] = newclass;
}

function importClass (name) {
	var treeposition = window;
	var parts = name.split(".");
	var classname = parts.pop();
	for (var i = 0; i < parts.length; i++) {
		if (!treeposition[parts[i]]) {
			treeposition[parts[i]] = {};
		}
		treeposition = treeposition[parts[i]];
	}
	window[classname] = treeposition[classname];
}