import React from 'react';

export default function AppLoading() {
  const [spinner, setSpinner] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      switch (spinner) {
        case '':
          setSpinner('.');
          break;
        case '.':
          setSpinner('..');
          break;
        case '..':
          setSpinner('...');
          break;
        case '...':
          setSpinner('');
          break;
      }
    }, 275);

    return () => window.clearTimeout(timer);
  }, [spinner]);

  return <span>Loading{spinner}</span>;
}
