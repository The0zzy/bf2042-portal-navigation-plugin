(function () {
  const pluginId = "bf2042-portal-navigation-plugin";
  const plugin = BF2042Portal.Plugins.getPlugin(pluginId);

  let pluginData = { scrollableWorkspace: false };

  function toggleScrollableWorkspace() {
    _Blockly.getMainWorkspace().options.moveOptions.wheel = !_Blockly.getMainWorkspace()
      .options.moveOptions.wheel;
    pluginData.scrollableWorkspace = _Blockly.getMainWorkspace().options.moveOptions.wheel;
    logInfo(
      "Scrollable Workspace set to " +
        (pluginData.scrollableWorkspace === true ? "TRUE" : "FALSE")
    );
    try {
      BF2042Portal.Shared.saveToLocalStorage(pluginId, pluginData);
      logInfo("Saved current setting in local storage.");
    } catch (error) {
      logError("Couldn't save current setting in local storage.", error);
    }
  }

  const toggleScrollItem = {
    displayText: "Toggle Scroll Workspace",
    preconditionFn: () => "enabled",
    callback: toggleScrollableWorkspace,
    scopeType: _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
    id: "toggleScrollItem",
    weight: 200,
  };

  plugin.initializeWorkspace = function () {
    logInfo("Initializing...");
    try {
      let loadedData = BF2042Portal.Shared.loadFromLocalStorage(pluginId);
      if (loadedData) {
        pluginData = loadedData;
      }
    } catch (exception) {
      logError("Couldn't load settings from local storage!", exception);
    }
    try {
      _Blockly.getMainWorkspace().options.moveOptions.wheel =
        pluginData.scrollableWorkspace;
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
