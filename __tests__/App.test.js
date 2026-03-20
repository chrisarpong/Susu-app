const { render } = require('@testing-library/react-native');
const App = require('../App');

test('renders correctly', () => {
  const { getByText } = render(<App />);
  expect(getByText('Welcome to the App!')).toBeTruthy();
});