import ChatComponent from './components/ChatComponent'
import './App.css'

function App() {
  return( <>
      <div className="max-w-lg mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-full max-w-lg bg-white shadow-lg overfloe-hidden">
            <ChatComponent/>
        </div>
      </div>
  </>
  )
}

export default App
