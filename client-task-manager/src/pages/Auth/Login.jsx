import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import InputField from '../../components/InputField';
import Logo from '../../assets/evive-logo.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from '../../redux/actions/userActions';
import { authService } from '../../apis/service';
import { getUserProfileRequest } from '../../redux/actions/taskActions';
import { toast } from 'react-toastify';

const Login = () => {
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
      navigate('/task-form');
    }
  }, [isAuthenticated, isUserAuthenticated, navigate]);

  // Function runs on successful login
  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        dispatch(loginSuccess(response.data));
        localStorage.setItem(
          'jwtToken',
          JSON.stringify(`Bearer ${response.data.token}`)
        );
        toast.success(`${response.data.message}`);
        getUserProfile();
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  // Function to fetch user details
  const getUserProfile = async () => {
    try {
      const response = await authService.getUserProfile();
      if (response.success) {
        dispatch(getUserProfileRequest(response?.data));
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        title="Login"
        text={
          <div>
            <p>
              <b>Welcome to Task Management</b>
            </p>
            <p>
              Already have an Account?<Link to="/signup"><i>Sign-up here
                </i> </Link>
            </p>
          </div>
        }
        imageUrl={Logo}
      >
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
            name={'login'}
            text={'Login'}
            onClick={(e) => onLogin(e)}
          />
        </div>
      </Card>
    </div>
  );
};

export default Login;
