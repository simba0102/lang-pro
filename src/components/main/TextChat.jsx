import React, { useState } from 'react';
import SubmitButton from './SubmitButton';
import Regenerate from './Regenerate';
import Footer from './Footer';
import TextareaAutosize from 'react-textarea-autosize';
import handleSubmit from '~/utils/handleSubmit';
import { useSelector, useDispatch } from 'react-redux';
import { setConversation, setError } from '~/store/convoSlice';
import { setMessages } from '~/store/messageSlice';
import { setSubmitState } from '~/store/submitSlice';
import { setText } from '~/store/textSlice';

export default function TextChat({ messages, reloadConvos }) {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const convo = useSelector((state) => state.convo);
  const { isSubmitting } = useSelector((state) => state.submit);
  const { text } = useSelector((state) => state.text);
  const { error } = convo;

  const submitMessage = () => {
    if (!!error) {
      dispatch(setError(false));
    }

    if (!!isSubmitting || text.trim() === '') {
      return;
    }
    dispatch(setSubmitState(true));
    const payload = text.trim();
    const currentMsg = { sender: 'user', text: payload, current: true };
    const initialResponse = { sender: 'GPT', text: '' };
    dispatch(setMessages([...messages, currentMsg, initialResponse]));
    dispatch(setText(''));
    const messageHandler = (data) => {
      dispatch(setMessages([...messages, currentMsg, { sender: 'GPT', text: data }]));
    };
    const convoHandler = (data) => {
      if (convo.conversationId === null && convo.parentMessageId === null) {
        const { title, conversationId, parentMessageId } = data;
        dispatch(setConversation({ title, conversationId, parentMessageId: data.id }));
      }

      reloadConvos();
      dispatch(setSubmitState(false));
    };

    const errorHandler = (event) => {
      console.log('Error:', event);
      const errorResponse = {
        ...initialResponse,
        text: `An error occurred. Please try again in a few moments.\n\nError message: ${event.data}`,
        error: true
      };
      setErrorMessage(event.data);
      dispatch(setSubmitState(false));
      dispatch(setMessages([...messages.slice(0, -2), currentMsg, errorResponse]));
      dispatch(setText(payload));
      dispatch(setError(true));
      return;
    };
    console.log('User Input:', payload);
    handleSubmit({ text: payload, messageHandler, convo, convoHandler, errorHandler });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      console.log('Enter + Shift');
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      if (!!isSubmitting) {
        return;
      }

      submitMessage();
    }
  };

  const changeHandler = (e) => {
    const { value } = e.target;
    if (isSubmitting && (value === '' || value === '\n')) {
      return;
    }
    dispatch(setText(value));
  };

  const tryAgain = (e) => {
    e.preventDefault();
    dispatch(setError(false));
  };

  return (
    <div className="md:bg-vert-light-gradient dark:md:bg-vert-dark-gradient absolute bottom-0 left-0 w-full border-t bg-white dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent md:!bg-transparent md:dark:border-transparent">
      <form className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div className="relative flex h-full flex-1 md:flex-col">
          <div className="ml-1 mt-1.5 flex justify-center gap-0 md:m-auto md:mb-2 md:w-full md:gap-2" />
          {/* removed this prop shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] */}
          {!!error ? (
            <Regenerate
              submitMessage={submitMessage}
              tryAgain={tryAgain}
              errorMessage={errorMessage}
            />
          ) : (
            <div className="relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-md dark:border-gray-900/50 dark:bg-gray-700 dark:text-white dark:shadow-lg md:py-3 md:pl-4">
              <TextareaAutosize
                tabIndex="0"
                // style={{maxHeight: '200px', height: '24px', overflowY: 'hidden'}}
                rows="1"
                value={text}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                onChange={changeHandler}
                placeholder=""
                className="m-0 h-auto max-h-52 resize-none overflow-auto border-0 bg-transparent p-0 pl-2 pr-7 leading-6 focus:outline-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
              />
              <SubmitButton submitMessage={submitMessage} />
            </div>
          )}
        </div>
      </form>
      <Footer />
    </div>
  );
}
