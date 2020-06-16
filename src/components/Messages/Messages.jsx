import React, {useState} from 'react';
import css from './Messages.module.scss';
import no_avatar from "../../assets/images/profile/no_avatar.png";
import Redirect from "react-router-dom/es/Redirect";


let Sender = React.memo((props) => {

    let [dialogIsOpen, setOpenDialog] = useState(false);

    const onOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <>
           {!dialogIsOpen ?
               <div className={css.messages__sender_item} onClick={onOpenDialog}>
                  <div className={css.user_wrapper}>
                     <div className={css.avatar_wrapper}>
                        <img src={props.userAvatar || no_avatar} alt="avatar"/>
                     </div>
                     <div className={css.user_info}>
                        <div className={css.name_and_message_data_wrapper}>
                           <span className={css.user_name}>User Name</span>
                           <span className={css.last_message_date}>22.03.2020</span>
                        </div>
                        <span className={css.last_message}>Last written message...</span>
                     </div>
                  </div>
               </div>
               : <Redirect to={'/dialog'}/>
           }
        </>
    )
});

let Messages = React.memo((props) => {

    let senders = [];
    for (let i = 1; i < 100; i++) {
        senders.push(i);
    }

    return (
        <div className={css.messages}>
            <div className={css.messages__senders_list}>

                {
                    senders.map((s) => {
                        return <Sender/>
                    })
                }

            </div>
            {/*<div className={css.messages_right_block}>{null}</div>*/}
        </div>
    )
});

export default Messages;


