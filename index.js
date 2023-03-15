(function () {
  const pluginId = "bf2042-portal-navigation-plugin";
  const plugin = BF2042Portal.Plugins.getPlugin(pluginId);

  let pluginData = {scrollableWorkspace: false};

  const toggleScrollItem = {
    displayText: "Toggle Scroll Workspace",
    preconditionFn: () => "enabled",
    callback: function () {
      _Blockly.getMainWorkspace().options.moveOptions.wheel = !_Blockly.getMainWorkspace()
        .options.moveOptions.wheel;
pluginData.scrollableWorkspace=_Blockly.getMainWorkspace().options.moveOptions.wheel;
BF2042Portal.Shared.saveToLocalStorage(pluginId, pluginData);
    },
    scopeType: _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
    id: "toggleScrollItem",
    weight: 200,
  };

  plugin.initializeWorkspace = function () {
    logInfo("Initializing...");
    try {
      let loadedData = BF2042Portal.Shared.loadFromLocalStorage(pluginId)
      if(loadedData){
pluginData = loadedData;
}
_Blockly.ContextMenuRegistry.registry.register(toggleScrollItem);
      logInfo("Initialized!");
    } catch (exception) {
      logError("Failed to initialize!", exception);
    }
  };

  function getLogPrefix(messageType) {
    return "[" + pluginId + "] [" + messageType + "] - ";
  }

  function logInfo(message, data) {
    console.info(getLogPrefix("INFO") + message, data);
  }

  function logWarning(message, data) {
    console.warn(getLogPrefix("WARNING") + message, data);
  }

  function logError(message, data) {
    console.error(getLogPrefix("ERROR") + message, data);
  }
})();
