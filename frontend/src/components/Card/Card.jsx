import "./Card.css";


export default function Card({node,onNext}){


    if(!node){

        return null;

    }


    return (

        <div className="card">


            <h2>
                {node.title}
            </h2>


            <p>
                {node.text}
            </p>



            {node.image && (

                <img
                    src={`/assets/images/${node.image}`}
                    alt={node.title}
                />

            )}



            {
            node.type === "choice" &&

            node.choices.map((choice,index)=>(

                <button
                    key={index}
                    onClick={() => onNext(choice.next)}
                >

                    {choice.text}

                </button>

            ))

            }



            {
            node.type !== "choice" &&
            node.next &&

            <button
                onClick={()=>onNext(node.next)}
            >

                Continue

            </button>

            }


        </div>

    );

}