import React, { Fragment } from "react";
import Card from "@/components/Card";
import UsersList from "./UsersList";
import RecommendedList from "./RecommendedList";
import Header3 from "@/components/Header3";
import Header4 from "@/components/Header4";

function MainRightBar() {
  return (
    <section>
      <section>
        <Card>
          <div className="">
            <Header4 title={"Latest Users"} />
          </div>
          <div className="mt-2">
            {[0, 1, 2, 3].map((el) => {
              return (
                <Fragment key={el}>
                  <UsersList />
                </Fragment>
              );
            })}
          </div>
        </Card>
      </section>
      <section className="mt-4">
        <Card className="">
          <div className="">
            <Header4 title={"Recommended"} />
          </div>
          <div className="mt-2 max-h-[40vh] overflow-auto scrollbar pr-2">
            {[0, 1, 2, 3].map((el) => {
              return (
                <Fragment key={el}>
                  <RecommendedList />
                </Fragment>
              );
            })}
          </div>
        </Card>
      </section>
    </section>
  );
}

export default MainRightBar;
