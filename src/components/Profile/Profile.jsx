import React from 'react';
import css from './Profile.module.scss';
import ProfileAvatar from "./ProfileAvatarBlock/ProfileAvatar";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import AddPostArea from "./AddPostArea/AddPostArea";
import Post from "./Posts/Posts";

let Profile = React.memo((props) => {
    //Posts mapping
    let posts = props.profilePosts.map((p) => <Post key={p.id} postText={p.postText}/>);
    posts.reverse();

    return (
        <div className={css.profile}>
            <div className={css.profile__left_block}>
                <ProfileAvatar isOwner={props.isOwner}
                               userAvatar={props.userProfile.photos.large}
                               saveProfilePhoto={props.saveProfilePhoto} />
            </div>
            <div className={css.profile__right_block}>
                <ProfileInfo
                    profileUserStatus={props.profileUserStatus}
                    updateStatus={props.updateStatus}
                    isOwner={props.isOwner}
                    updateUserProfile={props.updateUserProfile}
                    userProfile={props.userProfile}
                    {...props.userProfile}
                />
                <AddPostArea updatePostText={props.updatePostText}
                             addPost={props.addPost}
                />
                {posts}
            </div>
        </div>
    )
});

export default Profile;


