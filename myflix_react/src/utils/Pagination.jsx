
export const PageForward = (searchParams, setSearchParams) => {
    let page = searchParams.get("page");
    if (page){
        searchParams.set("page", String(Number(page) + 1));
        setSearchParams(searchParams); 
    } else {
        searchParams.append("page", "2");
        setSearchParams(searchParams); 
    }
    window.location.reload();
}

export const PageBackward = (searchParams, setSearchParams) => {
    let page = searchParams.get("page");
    if (page && page >= 1){
        searchParams.set("page", String(Number(page) - 1));
        setSearchParams(searchParams); 
    }
    window.location.reload();
}

export const BackToPageOne = (searchParams, setSearchParams) => {
    let page = searchParams.get("page");
    if (page && page >= 1){
        searchParams.delete("page");
        setSearchParams(searchParams);
    }
    window.location.reload();
}
