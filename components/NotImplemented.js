export default function NotImpl({ msg, children }) {
  return <div className="">
    <div className="bg-purple-100 rounded p-3 mb-7 border-2 border-purple-300 text-slate-500 hover:text-black">
      This component isn't implemented yet; but here's a message I've left myself to remind me what's supposed to go here:
      <br />
      <br />
      <p className="mx-3 text-sm font-mono font-semibold">{`> ${msg} <`}</p>
      {children ? (
        <>
          <br />
          <br />
          <p>And here's what I've got working so far:</p>
        </>
      ) : null}
    </div>
    <br />
    {children ? (
      <>
        {children}
      </>
    ) : null}
  </div>
}