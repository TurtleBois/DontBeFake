import "../styles/Invite.css"

const Invite = (props) => {
    return(
        /* /friendprofile link temporary, should be changed to be link to group */
        <body className="invite">
            <a href="/friendprofile"><img class="rounded-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/></a>
            <div className="invite-text">
                <p id="group-name"><b>{props.name}</b></p>
                <p id="group-count"><b>MemberCount: {props.num}</b></p>
            </div>
            <div className="invite-buttons">
                <button id="accept"><b>Accept.</b></button>
                <button id="reject"><b>Reject.</b></button>
            </div>
        </body>
        /*TODO: display proper group name and member count as well as functionality of accept and reject buttons*/
    )
}

export default Invite;