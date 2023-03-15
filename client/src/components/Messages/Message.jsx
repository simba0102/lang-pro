import React, { useState, useEffect, useRef } from 'react';
import TextWrapper from './TextWrapper';
import MultiMessage from './MultiMessage';
import { useSelector, useDispatch } from 'react-redux';
import HoverButtons from './HoverButtons';
import SiblingSwitch from './SiblingSwitch';
import Spinner from '../svg/Spinner';
import { setError } from '~/store/convoSlice';
import { setMessages } from '~/store/messageSlice';
import { setSubmitState, setSubmission } from '~/store/submitSlice';
import { setText } from '~/store/textSlice';
import { setConversation } from '../../store/convoSlice';
import { getIconOfModel } from '../../utils';

export default function Message({
  message,
  messages,
  scrollToBottom,
  currentEditId,
  setCurrentEditId,
  siblingIdx,
  siblingCount,
  setSiblingIdx
}) {
  const { isSubmitting, model, chatGptLabel, promptPrefix } = useSelector((state) => state.submit);
  const [abortScroll, setAbort] = useState(false);
  const { sender, text, isCreatedByUser, error, submitting } = message
  const textEditor = useRef(null)
  const convo = useSelector((state) => state.convo);
  const { initial } = useSelector((state) => state.models);
  const { error: convoError } = convo;
  const last = !message?.children?.length

  const edit = message.messageId == currentEditId;

  const dispatch = useDispatch();

  // const notUser = !isCreatedByUser; // sender.toLowerCase() !== 'user';
  const blinker = submitting && isSubmitting && last && !isCreatedByUser;

  useEffect(() => {
    if (blinker && !abortScroll) {
      scrollToBottom();
    }
  }, [isSubmitting, text, blinker, scrollToBottom, abortScroll]);

  useEffect(() => {
    if (last)
      dispatch(setConversation({parentMessageId: message?.messageId}))
  }, [last, ])

  // if (sender === '') {
  //   return <Spinner />;
  // }

  const enterEdit = (cancel) => setCurrentEditId(cancel?-1:message.messageId)

  const handleWheel = () => {
    if (blinker) {
      setAbort(true);
    } else {
      setAbort(false);
    }
  };

  const props = {
    className:
      'w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 bg-white dark:text-gray-100 group dark:bg-gray-800'
  };
  
  const icon = getIconOfModel({ sender, isCreatedByUser, model, chatGptLabel, promptPrefix, error });
  
  if (!isCreatedByUser)
    props.className =
      'w-full border-b border-black/10 bg-gray-50 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-100 dark:bg-[#444654]';

  const wrapText = (text) => <TextWrapper text={text} />;

  const resubmitMessage = () => {
    const text = textEditor.current.innerText

    if (convoError) {
      dispatch(setError(false));
    }

    if (!!isSubmitting || text.trim() === '') {
      return;
    }

    // this is not a real messageId, it is used as placeholder before real messageId returned
    const fakeMessageId = crypto.randomUUID();
    const isCustomModel = model === 'chatgptCustom' || !initial[model];
    const currentMsg = { 
      sender: 'User', text: text.trim(), current: true, isCreatedByUser: true, 
      parentMessageId: message?.parentMessageId, 
      conversationId: message?.conversationId, 
      messageId: fakeMessageId };
    const sender = model === 'chatgptCustom' ? chatGptLabel : model;

    const initialResponse = { sender, text: '', parentMessageId: fakeMessageId, submitting: true };

    dispatch(setSubmitState(true));
    dispatch(setMessages([...messages, currentMsg, initialResponse]));
    dispatch(setText(''));

    const submission = {
      isCustomModel,
      message: { 
        ...currentMsg, 
        model,
        chatGptLabel,
        promptPrefix,
      },
      messages: messages,
      currentMsg,
      initialResponse,
      sender,
    };
    console.log('User Input:', currentMsg?.text);
    // handleSubmit(submission);
    dispatch(setSubmission(submission));

    setSiblingIdx(siblingCount - 1)
    enterEdit(true);
  };

  return (
    <>
      <div
        {...props}
        onWheel={handleWheel}
      >
        <div className="relative m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">

          <div className="relative flex h-[30px] w-[30px] flex-col items-end text-right text-xs md:text-sm">
            {typeof icon === 'string' && icon.match(/[^\u0000-\u007F]+/) ? (
              <span className=" direction-rtl w-40 overflow-x-scroll">{icon}</span>
            ) : (
              icon
            )}
            <SiblingSwitch siblingIdx={siblingIdx} siblingCount={siblingCount} setSiblingIdx={setSiblingIdx} />
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 whitespace-pre-wrap md:gap-3 lg:w-[calc(100%-115px)]">
            <div className="flex flex-grow flex-col gap-3">
              {error ? (
                <div className="flex flex min-h-[20px] flex-col flex-grow items-start gap-4 gap-2 whitespace-pre-wrap text-red-500">
                  <div className="rounded-md border border-red-500 bg-red-500/10 py-2 px-3 text-sm text-gray-600 dark:text-gray-100">
                    {`An error occurred. Please try again in a few moments.\n\nError message: ${text}`}
                  </div>
                </div>
              ) : 
                edit ? (
                  <div className="flex min-h-[20px] flex-col flex-grow items-start gap-4 whitespace-pre-wrap">
                    {/* <div className={`${blinker ? 'result-streaming' : ''} markdown prose dark:prose-invert light w-full break-words`}> */}
                    
                    <div className="markdown prose dark:prose-invert light w-full break-words border-none focus:outline-none" 
                      contentEditable={true} ref={textEditor} suppressContentEditableWarning={true}>
                      {text}
                    </div>
                    <div className="text-center mt-2 flex w-full justify-center">
                      <button
                        className="btn relative btn-primary mr-2"
                        disabled={isSubmitting}
                        onClick={resubmitMessage}
                      >
                        Save & Submit
                      </button>
                      <button
                        className="btn relative btn-neutral"
                        onClick={() => enterEdit(true)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[20px] flex-col flex-grow items-start gap-4 whitespace-pre-wrap">
                    {/* <div className={`${blinker ? 'result-streaming' : ''} markdown prose dark:prose-invert light w-full break-words`}> */}
                    <div className="markdown prose dark:prose-invert light w-full break-words">
                      {!isCreatedByUser ? wrapText(text) : text}
                      {blinker && <span className="result-streaming">█</span>}
                    </div>
                  </div>
                )}
            </div>
              <HoverButtons model={model} visible={!error && isCreatedByUser && !edit} onClick={() => enterEdit()}/>
          </div>
        </div>
      </div>
      <MultiMessage
          messageList={message.children}
          messages={messages}
          scrollToBottom={scrollToBottom}
          currentEditId={currentEditId}
          setCurrentEditId={setCurrentEditId}
      />
    </>
  );
}
