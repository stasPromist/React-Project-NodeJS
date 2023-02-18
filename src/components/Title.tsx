

interface Props {
    main: string;
    sub: string;
}

function Title({main, sub}: Props) {
    return (
        <>
            <div className="text-center mt-3">
                <h1>{main}</h1>
                <h5>{sub}</h5>
            </div>

        </>
    );
}

export default Title;