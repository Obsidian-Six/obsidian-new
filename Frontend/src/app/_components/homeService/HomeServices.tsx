"use client";

import { useState } from "react";

import { TAB_CONFIG, type TabType } from "./home-services.data";

import ServicesList from "./ServicesList";

import "./homeservice.css";

export default function MainHomeServices() {
  const [activeTab, setActiveTab] = useState<TabType>("services");

  const activeConfig = TAB_CONFIG[activeTab];

  return (
    <section
      data-wf--services--variant="dark"
      className="section_home-services"
    >
      <div className="padding-global is-tiny">
        <div className="home-services_component py-5 md:py-12">
          <div className="padding-section-small" />

          <div className="padding-global services px-6 md:px-10">
            <div className="container-medium">
            

              <div className="head-grid">
                <div
                  id="w-node-b49cd8de-0c92-d267-ed5c-9dcd4e14131a-4e14130c"
                  // className="home-services_content"
                   className="text-[var(--white)] text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 block font-semibold"
                >
              
                [ Our Services ]
              </div>
                 <h2 className="text-4xl md:text-5xl text-[var(--white)] font-light tracking-tighter leading-none uppercase mb-5">
                Services
              </h2>

                  <div className="w-tabs">
                    <div className="tab-menu w-tab-menu" role="tablist">
                      {(Object.keys(TAB_CONFIG) as TabType[]).map((tab) => {
                        const config = TAB_CONFIG[tab];

                        const isActive = activeTab === tab;

                        return (
                          <button
                            key={tab}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${tab}`}
                            className={[
                              "tab-link",
                              "w-inline-block",
                              "w-tab-link",
                              isActive ? "w--current" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => setActiveTab(tab)}
                          >
                            <div>{config.label}</div>

                            <div
                              data-count={tab}
                              className="navbar_works-number"
                            >
                              ({config.count})
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="tabs-content w-tab-content">
                      <div
                        id={`panel-${activeTab}`}
                        role="tabpanel"
                        className="w-tab-pane w--tab-active"
                      >
                        {activeConfig.items.length > 0 ? (
                          <ServicesList
                            items={activeConfig.items}
                            type={activeTab}
                          />
                        ) : (
                          <div className="flex min-h-[400px] w-full items-center justify-center text-center">
                            <span className="text-4xl font-medium leading-none sm:text-5xl md:text-6xl lg:text-7xl">
                              Coming Soon...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                {/* </div> */}
              </div>
            </div>
          </div>

          <div className="padding-section-small" />
        </div>
      </div>
    </section>
  );
}
