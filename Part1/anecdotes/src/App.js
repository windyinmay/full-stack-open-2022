import { useState } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
      {quote: 'If it hurts, do it more often.', vote: 0},
      {quote: 'Adding manpower to a late software project makes it later!', vote: 0},
      {quote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 0},
      {quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0},
      {quote: 'Premature optimization is the root of all evil.', vote: 0},
      {quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote: 0},
      {quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', vote: 0}
  ]);
  const [selected, setSelected] = useState(0);
  const [maxVote, setMaxVote] = useState(null)
  const [mostVoted, setMostVoted] = useState(null)
  function randAnecdote() {
      const rand = Math.floor(Math.random() * anecdotes.length)
      setSelected(rand)
  }
    // const mostVote = anecdotes.reduce((prev, current) => {
    //     return prev.vote > current.vote ? prev : current
    // });
    function addVote() {
      const selectedAnecdote = [...anecdotes];
      selectedAnecdote[selected].vote += 1;
      setAnecdotes(selectedAnecdote);
      const mostVote = anecdotes.reduce((prev, current) => Math.max(prev, current.vote), 0);
      setMaxVote(mostVote)
      const mostVotedAnecdote = anecdotes.find(a => a.vote === mostVote);
      setMostVoted(mostVotedAnecdote.quote)
    }
  return (
    <div>
        <div>
            <h2>Anecdote of the day</h2>
        </div>
        <div>
            {anecdotes[selected].quote}
            <br/>
            has {anecdotes[selected].vote}
            <br/>
            <button onClick={addVote}>vote</button>
            <button onClick={randAnecdote}>next anecdote</button>
        </div>
        {maxVote &&
            <div>
                <div>
                    <h2>Anecdote with most votes</h2>
                </div>
                <div>{mostVoted}</div>
                <div>has {maxVote}</div>
            </div>
        }
    </div>
  )
}

export default App