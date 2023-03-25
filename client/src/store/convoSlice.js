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
  toneStyle: null,
  chatGptLabel: null,
  promptPrefix: null,
  convosLoading: false,
  pageNumber: 1,
  pages: 1,
  refreshConvoHint: 0,
  search: false,
  latestMessage: null,
  convos: [],
  convoMap: {},
};

const currentSlice = createSlice({
  name: 'convo',
  initialState,
  reducers: {
    refreshConversation: (state) => {
      state.refreshConvoHint = state.refreshConvoHint + 1;
    },
    setConversation: (state, action) => {
      // return { ...state, ...action.payload };

      for (const key in action.payload) {
        if (Object.hasOwnProperty.call(action.payload, key)) {
          state[key] = action.payload[key];
        }
      }
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
      state.toneStyle = null;
      state.chatGptLabel = null;
      state.promptPrefix = null;
      state.convosLoading = false;
      state.latestMessage = null;
    },
    setConvos: (state, action) => {
      const { convos, searchFetch } = action.payload;
      if (searchFetch) {
        state.convos = convos;
      } else {
        state.convos = convos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      // state.convoMap = convos.reduce((acc, curr) => {
      //   acc[curr.conversationId] = { ...curr };
      //   delete acc[curr.conversationId].conversationId;
      //   return acc;
      // }, {});
      
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    removeConvo: (state, action) => {
      state.convos = state.convos.filter((convo) => convo.conversationId !== action.payload);
    },
    removeAll: (state) => {
      state.convos = [];
    },
    setLatestMessage: (state, action) => {
      state.latestMessage = action.payload;
    }
  }
});

export const {
  refreshConversation,
  setConversation,
  setPages,
  setConvos,
  setNewConvo,
  setError,
  increasePage,
  decreasePage,
  setPage,
  removeConvo,
  removeAll,
  setLatestMessage
} = currentSlice.actions;

export default currentSlice.reducer;
