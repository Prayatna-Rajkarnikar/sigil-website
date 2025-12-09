export default function AgentDecisionUseCase() {
  const steps = [
    {
      title: "Situation",
      content:
        "E-commerce platform experiencing 40% cart abandonment rate during checkout",
    },
    {
      title: "Actor Involved",
      content: "AI Agent: Dynamic Pricing Optimizer",
    },
    {
      title: "Decision Made",
      content:
        "Agent detects price sensitivity at checkout and applies strategic 8% discount to high-value carts",
      showFlow: true,
    },
    {
      title: "Environmental Impact",
      content:
        "Cart abandonment reduced to 22%, revenue increased by 15% over 30 days",
      showMetrics: true,
    },
  ];

  const metrics = [
    { label: "Cart Abandonment", before: "40%", after: "22%", change: "-45%" },
    { label: "Conversion Rate", before: "2.3%", after: "3.8%", change: "+65%" },
    {
      label: "Revenue Impact",
      before: "$125K",
      after: "$144K",
      change: "+15%",
    },
  ];

  return (
    <div className="min-h-screen  p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-4">
        <h1 className="text-5xl font-black mb-3 tracking-tight">
          Agentic Decision Modeling
        </h1>
        <p className="text-xl font-medium">Real-world use case demonstration</p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Use Case Card */}
        <div className=" bg-white  p-10">
          <div className="flex-1 py-4">
            <h2 className="text-3xl font-black mb-2 text-black">
              Use Case: Dynamic Pricing Agent
            </h2>
            <p className="text-lg font-medium text-gray-700">
              E-commerce Checkout Optimization
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="">
            {steps.map((s, idx) => (
              <div key={idx} className="relative">
                <div className=" bg-black p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1 flex items-start gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-black text-xl">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black mb-2 ">{s.title}</h3>
                        <p className="text-base text-gray-100 font-medium">
                          {s.content}
                        </p>
                      </div>
                    </div>
                  </div>

                  {s.showFlow && (
                    <div className="mt-6 pt-6 border-t-2 border-white ">
                      <h4 className="text-xl font-black mb-6 text-white">
                        Agent Decision Flow
                      </h4>
                      <div className="grid grid-cols-4 gap-4">
                        {[
                          {
                            num: "1",
                            title: "Monitor",
                            desc: "Track user behavior and cart value in real-time",
                          },
                          {
                            num: "2",
                            title: "Analyze",
                            desc: "Detect abandonment signals and calculate optimal intervention",
                          },
                          {
                            num: "3",
                            title: "Decide",
                            desc: "Apply dynamic discount based on cart value and user segment",
                          },
                          {
                            num: "4",
                            title: "Execute",
                            desc: "Present personalized offer and track conversion outcome",
                          },
                        ].map((item, i) => (
                          <div key={i} className="relative">
                            <div className="relative bg-black border-2 border-white rounded-lg p-4 h-full">
                              <div className="w-10 h-10 border-2 border-white bg-white text-black flex items-center justify-center font-black text-lg mb-3 rounded-full">
                                {item.num}
                              </div>
                              <div className="font-black text-sm mb-2 text-white">
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-300 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {s.showMetrics && (
                    <div className="mt-6 pt-6 border-t-2 border-white">
                      <h4 className="text-xl font-black mb-6 text-white">
                        Impact Metrics
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {metrics.map((m, i) => (
                          <div key={i} className="relative">
                            <div className="relative bg-black border-2 border-white rounded-sm p-6">
                              <h5 className="font-black mb-4 text-xs uppercase tracking-widest text-white border-b border-white pb-2">
                                {m.label}
                              </h5>
                              <div className="space-y-3">
                                <div>
                                  <div className="text-xs font-bold text-gray-400 mb-1">
                                    Before
                                  </div>
                                  <div className="text-2xl font-black text-white">
                                    {m.before}
                                  </div>
                                </div>
                                <div className="border-t border-dashed border-gray-600 pt-3">
                                  <div className="text-xs font-bold text-gray-400 mb-1">
                                    After
                                  </div>
                                  <div className="text-2xl font-black text-white">
                                    {m.after}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2 bg-white text-black p-2 -mx-2">
                                  <span className="font-black text-sm">
                                    {m.change}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex justify-center">
                    <div className="w-1 h-6 bg-black" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="relative">
          <div className="absolute inset-0 bg-black transform translate-x-1 translate-y-1"></div>
          <div className="relative bg-white border-4 border-black p-6 flex items-start gap-4">
            <p className="text-base text-gray-800 font-medium leading-relaxed">
              This agent continuously learns from each decision outcome,
              refining its pricing strategy to maximize both conversion rates
              and revenue over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
