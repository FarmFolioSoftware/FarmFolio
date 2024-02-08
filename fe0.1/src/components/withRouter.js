import { useNavigate } from 'react-router-dom'; 

const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();

  return (
    <WrappedComponent
      {...props}
      {...{ navigate }}
    />
  );
};

export default withRouter;