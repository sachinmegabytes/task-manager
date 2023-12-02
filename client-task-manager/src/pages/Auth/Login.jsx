import Button from '../../components/Button';
import Card from '../../components/Card';
import InputField from '../../components/InputField';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        title="Login"
        text="Welcome to Task management, Please login to see your tasks"
        imageUrl="https://media.licdn.com/dms/image/C560BAQGiK3y531EAfw/company-logo_100_100/0/1656423940730/evivve_mogl_logo?e=1709164800&v=beta&t=IVy4uCaY29euCuf0-UjAyPPkLMUo7AUuivx_PMfMoB8"
      >
        <InputField
          type={'text'}
          isRequired
          label={'Enter Email'}
          labelName={'Email'}
          name={'email'}
          placeholder={'Enter your Email'}
        />
        <InputField
          type={'password'}
          isRequired
          label={'Enter Password'}
          labelName={'Password'}
          name={'password'}
          placeholder={'Should be 6 digit long'}
        />
        <div className="flex justify-center items-center py-6">
          <Button type={'submit'} name={'login'} text={'Login'} />
        </div>
      </Card>
    </div>
  );
};

export default Login;
