import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: false,
  title: 'ChatGPT Clone',
  conversationId: null,
  parentMessageId: null,
  jailbreakConversationId: null,
  conversationSignature: null,
  clientId: null,
  invocationId: null,
  chatGptLabel: null,
  promptPrefix: null,
  convosLoading: false,
  pageNumber: 1,
  pages: 1,
  refreshConvoHint: 0,
  convos: [],
};

const currentSlice = createSlice({
  name: 'convo',
  initialState,
  reducers: {
    refreshConversation: (state, action) => {
      state.refreshConvoHint = state.refreshConvoHint + 1;
    },
    setConversation: (state, action) => {
      return { ...state, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    increasePage: (state) => {
      state.pageNumber = state.pageNumber + 1;
    },
    decreasePage: (state) => {
      state.pageNumber = state.pageNumber - 1;
    },
    setPage: (state, action) => {
      state.pageNumber = action.payload;
    },
    setNewConvo: (state) => {
      state.error = false;
      state.title = 'ChatGPT Clone';
      state.conversationId = null;
      state.parentMessageId = null;
      state.jailbreakConversationId = null;
      state.conversationSignature = null;
      state.clientId = null;
      state.invocationId = null;
      state.chatGptLabel = null;
      state.promptPrefix = null;
      state.convosLoading = false;
    },
    setConvos: (state, action) => {
      state.convos = action.payload.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    removeConvo: (state, action) => {
      state.convos = state.convos.filter((convo) => convo.conversationId !== action.payload);
    },
    removeAll: (state) => {
      state.convos = [];
    }
  }
});

export const { refreshConversation, setConversation, setPages, setConvos, setNewConvo, setError, increasePage, decreasePage, setPage, removeConvo, removeAll } =
  currentSlice.actions;

export default currentSlice.reducer;
