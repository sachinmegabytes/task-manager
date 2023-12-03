import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import InputField from '../../components/InputField';
import Logo from '../../assets/evive-logo.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../apis/service';
import {
  signupFailure,
  signupRequest,
  signupSuccess,
} from '../../redux/actions/userActions';
import { toast } from 'react-toastify';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetching user from redux
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const isUserAuthenticated = localStorage.getItem('user') !== null;

  // to check user authentication
  useEffect(() => {
    if (isAuthenticated || isUserAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isUserAuthenticated, navigate]);

  // Function runs on successful Signup
  const onSignup = async (e) => {
    e.preventDefault();
    dispatch(signupRequest());
    try {
      const response = await authService.signup(username, email, password);
      if (response.success) {
        dispatch(signupSuccess(response.data));
        toast.success(`${response.data.message}`);
        navigate('/');
      }
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        title="Signup"
        text="Welcome to Task management, Please Signup to get Started"
        imageUrl={Logo}
      >
        <InputField
          type={'text'}
          isRequired
          label={'Enter Username'}
          labelName={'Username'}
          name={'username'}
          placeholder={'Should be 3 Characters long'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type={'text'}
          isRequired
          label={'Enter Email'}
          labelName={'Email'}
          name={'email'}
          placeholder={'Enter your Email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type={'password'}
          isRequired
          label={'Enter Password'}
          labelName={'Password'}
          name={'password'}
          placeholder={'Should be 6 digit long'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center items-center py-6">
          <Button
            type={'submit'}
            name={'signup'}
            text={'SignUp'}
            onClick={(e) => onSignup(e)}
          />
        </div>
      </Card>
    </div>
  );
};

export default Signup;
