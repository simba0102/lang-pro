export enum QueryKeys {
  messages = 'messages',
  sharedMessages = 'sharedMessages',
  sharedLinks = 'sharedLinks',
  allConversations = 'allConversations',
  archivedConversations = 'archivedConversations',
  searchConversations = 'searchConversations',
  conversation = 'conversation',
  searchEnabled = 'searchEnabled',
  user = 'user',
  name = 'name', // user key name
  models = 'models',
  balance = 'balance',
  endpoints = 'endpoints',
  presets = 'presets',
  searchResults = 'searchResults',
  tokenCount = 'tokenCount',
  availablePlugins = 'availablePlugins',
  startupConfig = 'startupConfig',
  assistants = 'assistants',
  assistant = 'assistant',
  endpointsConfigOverride = 'endpointsConfigOverride',
  files = 'files',
  fileConfig = 'fileConfig',
  tools = 'tools',
  actions = 'actions',
  assistantDocs = 'assistantDocs',
  fileDownload = 'fileDownload',
  voices = 'voices',
  prompts = 'prompts',
  prompt = 'prompt',
  promptGroups = 'promptGroups',
  promptGroup = 'promptGroup',
  categories = 'categories',
  randomPrompts = 'randomPrompts',
  roles = 'roles',
}

export enum MutationKeys {
  fileUpload = 'fileUpload',
  fileDelete = 'fileDelete',
  updatePreset = 'updatePreset',
  deletePreset = 'deletePreset',
  logoutUser = 'logoutUser',
  avatarUpload = 'avatarUpload',
  speechToText = 'speechToText',
  textToSpeech = 'textToSpeech',
  assistantAvatarUpload = 'assistantAvatarUpload',
  updateAction = 'updateAction',
  deleteAction = 'deleteAction',
  deleteUser = 'deleteUser',
  updateRole = 'updateRole',
}
