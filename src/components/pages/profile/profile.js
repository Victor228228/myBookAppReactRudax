
import "./profile.css";

const Profile = () => {
    const exitOfProfile = () => {
        localStorage.clear();
        window.location.replace("/");
    }
    if (!localStorage.getItem("idToken") && localStorage.getItem("timeSessionLeft") <=0) {
        return <h3>Please, enter in this shit</h3>
    }

    return(
        <div color="profile">
            <button className="profile_button" onClick={exitOfProfile}>
                Exit of your profile
            </button>
        </div>
    )
}

export default Profile;