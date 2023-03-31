import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import SubmitButton from './SubmitButton';
import AdjustToneButton from './AdjustToneButton';
import OpenAIOptions from './OpenAIOptions';
import BingStyles from './BingStyles';
import EndpointMenu from './Endpoints/EndpointMenu';
import Footer from './Footer';
import TextareaAutosize from 'react-textarea-autosize';
import RegenerateIcon from '../svg/RegenerateIcon';
import StopGeneratingIcon from '../svg/StopGeneratingIcon';
import { useMessageHandler } from '../../utils/handleSubmit';

import store from '~/store';

export default function TextChat({ isSearchView = false }) {
  const inputRef = useRef(null);
  const isComposing = useRef(false);

  const conversation = useRecoilValue(store.conversation);
  const latestMessage = useRecoilValue(store.latestMessage);
  const messages = useRecoilValue(store.messages);
  const [text, setText] = useRecoilState(store.text);
  // const [text, setText] = useState('');

  const isSubmitting = useRecoilValue(store.isSubmitting);

  // TODO: do we need this?
  const disabled = false;

  const { ask, regenerate, stopGenerating } = useMessageHandler();

  const bingStylesRef = useRef(null);
  const [showBingToneSetting, setShowBingToneSetting] = useState(false);

  const isNotAppendable = latestMessage?.cancelled || latestMessage?.error;

  // auto focus to input, when enter a conversation.
  useEffect(() => {
    if (conversation?.conversationId !== 'search') inputRef.current?.focus();
    setText('');
  }, [conversation?.conversationId]);

  // controls the height of Bing tone style tabs
  useEffect(() => {
    if (!inputRef.current) {
      return; // wait for the ref to be available
    }

    const resizeObserver = new ResizeObserver(() => {
      const newHeight = inputRef.current.clientHeight;
      if (newHeight >= 24) {
        // 24 is the default height of the input
        bingStylesRef.current.style.bottom = 15 + newHeight + 'px';
      }
    });
    resizeObserver.observe(inputRef.current);
    return () => resizeObserver.disconnect();
  }, [inputRef]);

  const submitMessage = () => {
    ask({ text });
    setText('');
  };

  const handleRegenerate = () => {
    if (latestMessage && !latestMessage?.isCreatedByUser) regenerate(latestMessage);
  };

  const handleStopGenerating = () => {
    stopGenerating();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      if (!isComposing?.current) submitMessage();
    }
  };

  const handleKeyUp = e => {
    if (e.keyCode === 8 && e.target.value.trim() === '') {
      setText(e.target.value);
    }

    if (e.key === 'Enter' && e.shiftKey) {
      return console.log('Enter + Shift');
    }

    if (isSubmitting) {
      return;
    }
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = () => {
    isComposing.current = false;
  };

  const changeHandler = e => {
    const { value } = e.target;

    setText(value);
  };

  const getPlaceholderText = () => {
    if (isSearchView) {
      return 'Click a message title to open its conversation.';
    }

    if (disabled) {
      return 'Choose another model or customize GPT again';
    }

    if (isNotAppendable) {
      return 'Edit your message or Regenerate.';
    }

    return '';
  };

  const handleBingToneSetting = () => {
    setShowBingToneSetting(show => !show);
  };

  if (isSearchView) return <></>;

  return (
    <>
      <div className="input-panel md:bg-vert-light-gradient dark:md:bg-vert-dark-gradient fixed bottom-0 left-0 w-full border-t bg-white py-2 dark:border-white/20 dark:bg-gray-800 md:absolute md:border-t-0 md:border-transparent md:bg-transparent md:dark:border-transparent md:dark:bg-transparent">
        <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:pt-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
          <div className="relative flex h-full flex-1 md:flex-col">
            <span className="order-last ml-1 flex flex-col items-center justify-center gap-0 md:order-none md:m-auto md:mb-2 md:w-full md:gap-2">
              {isSubmitting ? (
                <button
                  onClick={handleStopGenerating}
                  className="input-panel-button btn btn-neutral flex w-fit justify-center gap-2 border-0 md:border"
                  type="button"
                >
                  <StopGeneratingIcon />
                  <span className="hidden md:block">Stop generating</span>
                </button>
              ) : latestMessage && !latestMessage?.isCreatedByUser ? (
                <button
                  onClick={handleRegenerate}
                  className="input-panel-button btn btn-neutral flex w-fit justify-center gap-2 border-0 md:border"
                  type="button"
                >
                  <RegenerateIcon />
                  <span className="hidden md:block">Regenerate response</span>
                </button>
              ) : null}
              <OpenAIOptions conversation={conversation} />
              <BingStyles
                ref={bingStylesRef}
                show={showBingToneSetting}
              />
            </span>
            <div
              className={`relative flex flex-grow flex-col rounded-md border border-black/10 ${
                disabled ? 'bg-gray-100' : 'bg-white'
              } py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 ${
                disabled ? 'dark:bg-gray-900' : 'dark:bg-gray-700'
              } dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4`}
            >
              <EndpointMenu />
              <TextareaAutosize
                tabIndex="0"
                autoFocus
                ref={inputRef}
                // style={{maxHeight: '200px', height: '24px', overflowY: 'hidden'}}
                rows="1"
                value={disabled || isNotAppendable ? '' : text}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                onChange={changeHandler}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                placeholder={getPlaceholderText()}
                disabled={disabled || isNotAppendable}
                className="m-0 h-auto max-h-52 resize-none overflow-auto border-0 bg-transparent p-0 pl-12 pr-8 leading-6 placeholder:text-sm placeholder:text-gray-600 focus:outline-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent dark:placeholder:text-gray-500 md:pl-8"
              />
              <SubmitButton
                submitMessage={submitMessage}
                disabled={disabled || isNotAppendable}
              />
              {messages?.length && conversation?.model === 'sydney' ? (
                <AdjustToneButton onClick={handleBingToneSetting} />
              ) : null}
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
}
