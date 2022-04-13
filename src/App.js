import './App.css';
import React from 'react';
import Header from './components/Header';
// import Logo from './images/BKOI_TYPO_BLACK_ONLY.svg';
// https://api.bmapsbd.com/business/api/daily/usage/total

const App = () => {
  const [number, setNumber] = React.useState(0);
  // Transform Value
  const _transformValue = value => {
    const valueString = String(value).split('.')[0]
    let _value = ''
    for(let i = valueString.length-1; i >= 0; i--) {
      if(i > 0 && i < valueString.length-1 && (valueString.length-i) % 3 === 0) {
        _value = `,${ valueString[i] }` + _value
        continue
      }
      _value = valueString[i] + _value
    }
    return _value
  }
  React.useEffect(() => {

    const APICountURL = "https://api.bmapsbd.com/business/api/daily/usage/total";
    const mapAPICountURL = "https://geoserver.bmapsbd.com/api/count";
    const fetchData = async () => {
      try {
        //fetching first api
        const APIRes = await fetch(APICountURL);
        const APIResJson = await APIRes.json();
        const APICount = +APIResJson.current_day[0].totalUsage

        //console.log(mapAPIResJson)

        //fetching second api
        const mapAPIRes = await fetch(mapAPICountURL);
        const mapAPIResJson = await mapAPIRes.json();
        const mapAPICount = +mapAPIResJson.total

        //console.log(mapAPIResJson.total)
        
        
        //console.log(json.current_day[0].totalUsage)
        //console.log("count 1 count 2 totat", APICount, mapAPICount, APICount+mapAPICount)
        setNumber(APICount+mapAPICount)

        
      } catch (error) {
        //console.log(error);
      }
    };

    const id = setInterval(() => {
      fetchData(); // <-- (3) invoke in interval callback
    }, 600000);

    fetchData(); // <-- (2) invoke on mount
    return () => clearInterval(id);
  }, [setNumber])

  return (
    <div className="App">
      <Header/>
      {/* <div className='image'>
         <img src={Logo} alt="logo" height="100px" width="100px" />
      </div> */}
      
      <div className='count-wrapper'>

        <div className='count'>
          <h1>{_transformValue(number)}</h1>
        </div>
        <span>Total API Count</span>
      </div>

    </div>
  );
}

export default App;


 // React.useEffect(() => {
  //   const url = "https://api.bmapsbd.com/business/api/daily/usage/total";

  //   fetch(url)
  //     .then(response => {
  //       //console.log(response.json)
  //       return response.json()
  //     })
  //     .then(result => {
  //       console.log(result)
  //       console.log(result.current_day[0].totalUsage)
  //       setNumber(result.current_day[0].totalUsage)
  //     });

  // }, []);
