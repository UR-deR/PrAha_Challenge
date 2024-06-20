import { RegisterOptions, useForm } from 'react-hook-form';

const useFormHelper = () => {
  type Form = {
    first_name: string;
    last_name: string;
    email: string;
    tel: string;
    title: string;
    developer: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  return {
    handleSubmit: handleSubmit((data) => {
      console.log(data);
    }),
    register: (args: { name: keyof Form; rules: RegisterOptions<Form, keyof Form> | undefined }) =>
      register(args.name, args.rules),
    errors: {
      first_name: errors.first_name?.message,
      last_name: errors.last_name?.message,
      email: errors.email?.message,
      tel: errors.tel?.message,
      title: errors.title?.message,
      developer: errors.developer?.message,
    },
  };
};

export default function Form() {
  const { handleSubmit, register, errors } = useFormHelper();
  console.log(errors);

  return (
    <div style={wrapperStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="first name"
          {...register({
            name: 'first_name',
            rules: {
              required: true,
              maxLength: 80,
            },
          })}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="last name"
          {...register({
            name: 'last_name',
            rules: {
              required: true,
              maxLength: 100,
            },
          })}
        />

        <input
          style={inputStyle}
          type="text"
          placeholder="email"
          {...register({
            name: 'email',
            rules: {
              required: true,
              pattern: /^\S+@\S+$/i,
            },
          })}
        />

        <input
          style={inputStyle}
          type="tel"
          placeholder="tel"
          {...register({
            name: 'tel',
            rules: {
              required: true,
              minLength: 6,
              maxLength: 12,
            },
          })}
        />

        <select {...register({ name: 'title', rules: { required: true } })} style={inputStyle}>
          {['Mr', 'Mrs', 'Miss', 'Dr'].map((value) => (
            <option key={value} value={value} style={inputStyle}>
              {value}
            </option>
          ))}
        </select>

        <div style={developerRadioWrap}>
          {['Yes', 'No'].map((value) => (
            <label htmlFor={value} key={value}>
              {value}
              <input
                style={inputStyle}
                type="radio"
                value={value}
                {...register({
                  name: 'developer',
                  rules: {
                    required: true,
                  },
                })}
              />
            </label>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const wrapperStyle = {
  height: '100vh',
  backgroundColor: 'beige',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  width: '50%',
  margin: 'auto',
  paddingTop: '80px',
  gap: '20px',
};

const developerRadioWrap = {
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: '10px',
  color: 'black',
};

const inputStyle = {
  backgroundColor: 'white',
  color: 'black',
  borderColor: 'black !important',
};
