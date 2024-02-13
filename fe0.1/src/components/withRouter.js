import { useNavigate } from 'react-router-dom';
 

//allows the use of hooks in a class component such as "loginPage". To "include" this file do "export default withRouter(class name);"
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