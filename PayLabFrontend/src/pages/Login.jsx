import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">PayLab</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email or Number"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-sm text-gray-500 text-center">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot email or password?
            </a>
          </p>

          <button
  type="submit"
  className="rounded-2xl bg-blue-600 text-white px-3 py-2 font-semibold hover:bg-blue-700"
>
  Next
</button>
          <button
  type="submit"
  className="rounded-2xl border border-gray-300 text-gray-600 px-3 py-2 font-medium hover:bg-gray-50"
>
  log in with Number
</button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Link
         to="/signup"
          className="w-full border border-gray-300 rounded-2xl px-3 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 text-gray-500 font-medium"
        >
          <span>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default Login