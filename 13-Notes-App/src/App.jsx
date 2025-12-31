import { useState } from 'react'

const App = () => {

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [task, setTask] = useState([])

  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()

    const copyTask = [...task]

    if (isEditing) {
      copyTask[editIndex] = { title, details }
      setIsEditing(false)
      setEditIndex(null)
    } else {
      copyTask.push({ title, details })
    }

    setTask(copyTask)
    setTitle('')
    setDetails('')
  }

  const deleteNote = (idx) => {
    const copyTask = [...task]
    copyTask.splice(idx, 1)
    setTask(copyTask)
  }

  const editNote = (idx) => {
    setTitle(task[idx].title)
    setDetails(task[idx].details)
    setEditIndex(idx)
    setIsEditing(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 p-10">

        <form
          onSubmit={submitHandler}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 flex flex-col gap-5 shadow-xl"
        >
          <h1 className="text-4xl font-bold">
            {isEditing ? 'Edit Note ✏️' : 'Add Note 📝'}
          </h1>

          <input
            type="text"
            placeholder="Enter note title"
            className="w-full px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 outline-none focus:ring-2 focus:ring-white/40"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Write note details..."
            className="w-full px-5 py-3 h-36 rounded-xl bg-zinc-900 border border-zinc-700 outline-none focus:ring-2 focus:ring-white/40 resize-none"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />

          <button className="bg-white text-black py-2 rounded font-bold">
            {isEditing ? 'Update Note' : 'Add Note'}
          </button>
        </form>

        {/* RIGHT - NOTES */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold tracking-wide">📌 Recent Notes</h1>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-5 max-h-[70vh] overflow-auto pr-2">
            {task.map((elem, idx) => (
              <div
                key={idx}
                className="relative rounded-xl p-4 h-52 bg-gradient-to-br from-white to-gray-200 text-black shadow-lg"
              >
                <div className="overflow-hidden">
                  <h3 className="text-lg font-bold leading-tight">
                    {elem.title}
                  </h3>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-4">
                    {elem.details}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => editNote(idx)}
                    className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNote(idx)}
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App