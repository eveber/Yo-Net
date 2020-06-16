import React from 'react';
import css from './ProfileAvatar.module.scss';
import no_avatar from '../../../assets/images/profile/no_avatar.png';

let ProfileAvatar = React.memo((props) => {

    let saveProfilePhoto = (e) => {
        if(e.target.files.length) {
            let photo = e.target.files[0];
            props.saveProfilePhoto(photo);
        }
    };

   return (
       <div className={`${css.profile__avatar_block}  ${css.site_block}`}>
           <div className={css.profile__avatar}>
               <img src={props.userAvatar || no_avatar} alt="avatar"/>
           </div>
           <div className={css.profile__edit_controls}>
               {props.isOwner && <input type="file" onChange={saveProfilePhoto}/>}
           </div>
       </div>
   )
});

export default ProfileAvatar;
