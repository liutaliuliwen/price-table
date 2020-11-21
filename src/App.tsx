import React from 'react';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap-reboot.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-grid.css';
// import 'bootstrap/dist/js/bootstrap';
import Counter from './components/Counter';
// import FriendStatus from './components/FriendStatus';
import Timer from './components/Timer';
import Counter2 from './components/Counter2';
import Greeting from './components/Greeting';
// import Alert, { VariantType } from './components/Alerts/index';
import CaculateTable from './pages/caculateTable';
import 'antd/dist/antd.css';

export class App extends React.Component {
    
    render() {
        // const variantArr: VariantType[] = ['primary', 'secondary', 'success' , 'danger' , 'warning' , 'info' , 'light' ,'dark'];
        // const Link = Alert.Link;
        return (
            <div>
                <CaculateTable />
                {/* {variantArr.map((variant, index) =>   <Alert  variant={variant}>
                   SAS <Link>to google</Link>Hello World</Alert>)} */}
              
                {/* <Timer />
                <Counter />
                <Counter2 />
                <Greeting name={"Liutao"}/> */}
                {/* <FriendStatus friend={{id: '2121'}}/> */}
            </div>
        )
    }
}

