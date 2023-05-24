import React from "react"

const Page = () => {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="max-w-3xl bg-slate-600 p-10 border rounded">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xl">Embed on website</p>
            <p>
              To add the chatbot any where on your website, add this iframe to
              your html code
            </p>
          </div>
          <div className="border bg-slate-300 text-black p-2">
            <pre>
              <code>
                &lt;iframe <br />
                src="https://www.chatbase.co/chatbot-iframe/tgW1FCIe9T8saZ_J5Jlob"
                <br />
                width="100%" height="700" frameborder="0"&gt; <br />
                &lt;iframe&gt;
              </code>
            </pre>
          </div>
          <div>
            <p>
              To add a chat bubble to the bottom right of your website add this
              script tag to your html
            </p>
          </div>
          <div className="border bg-slate-300 text-black p-2">
            <pre>
              <code>
                &lt;iframe <br />
                src="https://www.chatbase.co/chatbot-iframe/tgW1FCIe9T8saZ_J5Jlob"
                <br />
                width="100%" height="700" frameborder="0"&gt; <br />
                &lt;iframe&gt;
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
