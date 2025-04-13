import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [mode, setMode] = useState('signup')
  const [user, setUser] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'signup') {
        await axios.post(`${apiUrl}/auth/register`, user)
        setMode('login')
        setUser({ name: '', email: '', password: '' })
      } else {
        const res = await axios.post(`${apiUrl}/auth/login`, {
          email: user.email,
          password: user.password
        })
        setUser(res.data.data)
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(mode === 'signup' ? 'login' : 'signup')
    setUser({ name: '', email: '', password: '' })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : mode === 'signup' ? 'Sign Up' : 'Login'}
          </button>

          <p className="text-center text-sm mt-4">
            {mode === 'signup' ? 'Already have an account? ' : 'Need an account? '}
            <button 
              type="button"
              onClick={switchMode}
              className="text-blue-600 hover:underline"
            >
              {mode === 'signup' ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Auth