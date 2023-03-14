(function () {
  const pluginId = "bf2042-portal-navigation-plugin";
  const plugin = BF2042Portal.Plugins.getPlugin(pluginId);

  const toggleScrollItem = {
    displayText: "Toggle Scroll Workspace",
    preconditionFn: () => "enabled",
    callback: function () {
      _Blockly.getMainWorkspace().options.moveOptions.wheel = !_Blockly.getMainWorkspace()
        .options.moveOptions.wheel;
    },
    scopeType: _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
    id: "toggleScrollItem",
    weight: 200,
  };

  plugin.initializeWorkspace = function () {
    logInfo("Initializing...");
    try {
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
