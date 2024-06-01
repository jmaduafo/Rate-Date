import React from "react";
import SearchLeftBar from "./SearchLeftBar";
import SearchRightBar from "./SearchRightBar";

function MainSearchPage({ searchParams }: { searchParams: { search: string}}) {
  return (
    <section className="md:flex md:gap-6">
      <div className="flex-[3]">
        <SearchLeftBar searchParams={searchParams}/>
      </div>
      <div className="flex-[1] md:block hidden">
        <SearchRightBar searchParams={searchParams}/>
      </div>
    </section>
  );
}

export default MainSearchPage;
