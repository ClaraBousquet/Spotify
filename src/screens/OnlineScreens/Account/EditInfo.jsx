import React, { useState } from 'react'
import CustomInput from '../../../components/CustomInput'
import ButtonLoader from '../../../components/Loader/ButtonLoader'
import { useAuthContext } from '../../../contexts/AuthContext'
import { USER_INFOS } from '../../../constants/appConstant'
import { checkUser } from '../../../services/userService'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { apiRoot, apiUrl } from '../../../constants/apiConstant'

const EditInfo = () => {

  const navigate = useNavigate();

  const { userId, email, nickname, signOut, signIn } = useAuthContext();

  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [emailValue, setEmailValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //on vérifie que l'utilisateur est le bon
      const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));
      const userValid = await checkUser(userInfo);

      if (userValid) {
        //on vérifie que tous champs sont remplis
        if (emailValue.length > 0 && nicknameValue.length > 0 && passwordValue.length > 0) {
          //on se crée un tableau pour vérifier le mdp (checkPassword)
          const dataCheck = {
            id: userId,
            password: passwordValue
          }

          //on crée un objet pour le patch (on ne prendra pas le mdp)
          const data = {
            email: emailValue,
            nickname: nicknameValue
          }

          const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }

          try {
            //requete qui verifie si le mot de passe est correct
            const respPassword = await axios.post(`${apiRoot}/check-password`, dataCheck, { headers });
            if (respPassword.data.response) {
              try {
                //requete qui verifie si l'email est déja utilisé
                const respEmail = await axios.get(`${apiUrl}/users?email=${emailValue}`);
                if (emailValue !== email && respEmail.data['hydra:member'].length > 0) {
                  setError('Email déjà utilisé');
                  return;
                } else {
                  try {
                    //config axios pour méthode patch
                    axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
                    //méthode qui modifie les infos de l'utilisateur
                    const resp = await axios.patch(`${apiUrl}/users/${userId}`, data);
                    //on reconstruit l'objet user
                    const user = {
                      userId: resp.data.id,
                      email: resp.data.email,
                      nickname: resp.data.nickname
                    };
                    //mise a jour du context d'authentification
                    signIn(user);
                    //on redirige vers la page de compte
                    navigate(`/account/${userId}`);

                  } catch (error) {
                    console.log(`Erreur sur la requete de modification des infos: ${error}`)
                  }
                }
              } catch (error) {
                console.log(`Erreur sur la requete de vérification de l'email: ${error}`)
              }
            } else {
              setError('Mot de passe incorrect');
              return;
            }
          } catch (error) {
            console.log(`Erreur sur la requete de vérification du mot de passe: ${error}`)
          }
        } else {
          setError('Tous les champs sont obligatoires');
          return;
        }
      } else {
        //on deconnecte
        signOut();
        //on redirige vers la page de connexion
        navigate('/');
      }
    } catch (error) {
    }
  }




  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
      <h2 className='text-white font-bold text-xl py-5'>Modifier mes infos</h2>
      <div className='text-red-600 font-bold mb-4'>{error}</div>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        {/* input pour nickname */}
        <CustomInput
          state={nicknameValue}
          label="Mon pseudo"
          type="text"
          callable={(event) => setNicknameValue(event.target.value)}
        />
        {/* input pour email */}
        <CustomInput
          state={emailValue}
          label="Mon email"
          type="email"
          callable={(event) => setEmailValue(event.target.value)}
        />
        {/* input pour password */}
        <CustomInput
          state={passwordValue}
          label="Mon mot de passe"
          type="password"
          callable={(event) => setPasswordValue(event.target.value)}
        />
        <div className='flex items-center justify-center pt-5'>
          {isLoading ? <ButtonLoader /> :
            <button type='submit' className='bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded'>
              Modifier mes infos
            </button>}
        </div>

      </form>
    </div>

  )
}

export default EditInfo