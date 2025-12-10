import Image from "next/image";

export default function ActorsPage() {
  return (
    <>
      {/* Hero - Introduction to Actors */}
      <section className="relative h-[70vh] bg-white">
        <div className="absolute left-12 top-1/3 w-[500px] space-y-8 rounded-3xl bg-black p-10 shadow-2xl">
          <h1 className="text-5xl font-bold leading-tight text-white">
            Autonomous AI Actors
          </h1>
          <p className="text-xl text-gray-300">
            Intelligent agents that perceive, decide, and act independently to achieve complex goals.
          </p>
          <div className="flex items-center justify-center py-4">
            <div className="h-48 w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full border-4 border-gray-600"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-20 w-20 rounded-full border-2 border-gray-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: What Are AI Actors? */}
      <section className="mx-auto max-w-6xl px-12 py-24">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Understanding AI Actors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Autonomous entities capable of independent decision-making, learning from environments, 
            and collaborating with other agents to solve complex problems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Autonomous */}
          <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-300 shadow-lg">
            <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
              <div className="h-6 w-6 bg-white"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Autonomous Agents</h3>
            <p className="text-gray-600">
              Self-directed entities that operate without continuous human intervention, 
              making decisions based on their programming and environmental feedback.
            </p>
          </div>
          
          {/* Card 2: Learning */}
          <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-300 shadow-lg">
            <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
              <div className="h-6 w-6 bg-white"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Continuous Learning</h3>
            <p className="text-gray-600">
              Agents that improve over time through experience, adapting to new scenarios 
              and optimizing their decision-making processes.
            </p>
          </div>
          
          {/* Card 3: Collaborative */}
          <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-300 shadow-lg">
            <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
              <div className="h-6 w-6 bg-white"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Multi-Agent Systems</h3>
            <p className="text-gray-600">
              Networks of agents that collaborate, communicate, and coordinate to achieve 
              objectives beyond individual capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: The Agentic Decision Cycle */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-12">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              The Decision-Making Cycle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How AI actors process information and make intelligent decisions
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2 space-y-8">
              {/* Step 1: Perception */}
              <div className="space-y-4 p-6 bg-white rounded-xl border border-gray-300">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-bold text-gray-900">Perception</h3>
                </div>
                <p className="text-gray-600">
                  Agents gather data from their environment through sensors, APIs, or inputs, 
                  creating a comprehensive understanding of the current state.
                </p>
              </div>
              
              {/* Step 2: Analysis */}
              <div className="space-y-4 p-6 bg-white rounded-xl border border-gray-300">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">2</div>
                  <h3 className="text-xl font-bold text-gray-900">Analysis & Reasoning</h3>
                </div>
                <p className="text-gray-600">
                  Process information using ML models, rules, or neural networks to 
                  understand patterns, predict outcomes, and evaluate options.
                </p>
              </div>
              
              {/* Step 3: Decision */}
              <div className="space-y-4 p-6 bg-white rounded-xl border border-gray-300">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">3</div>
                  <h3 className="text-xl font-bold text-gray-900">Decision Making</h3>
                </div>
                <p className="text-gray-600">
                  Select optimal actions from available choices based on goals, 
                  constraints, and predicted outcomes.
                </p>
              </div>
              
              {/* Step 4: Action */}
              <div className="space-y-4 p-6 bg-white rounded-xl border border-gray-300">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">4</div>
                  <h3 className="text-xl font-bold text-gray-900">Action & Feedback</h3>
                </div>
                <p className="text-gray-600">
                  Execute decisions and observe results, using feedback to learn 
                  and improve future decision-making.
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="h-[500px] w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center">
                {/* Circular diagram of the cycle */}
                <div className="relative h-80 w-80">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                  
                  {/* Perception node */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                      <div className="h-8 w-8 bg-black rounded-full"></div>
                    </div>
                    <div className="text-white text-center mt-2">Perception</div>
                  </div>
                  
                  {/* Analysis node */}
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                      <div className="h-8 w-8 bg-black rounded-full"></div>
                    </div>
                    <div className="text-white text-center mt-2">Analysis</div>
                  </div>
                  
                  {/* Decision node */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                      <div className="h-8 w-8 bg-black rounded-full"></div>
                    </div>
                    <div className="text-white text-center mt-2">Decision</div>
                  </div>
                  
                  {/* Action node */}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                      <div className="h-8 w-8 bg-black rounded-full"></div>
                    </div>
                    <div className="text-white text-center mt-2">Action</div>
                  </div>
                  
                  {/* Arrows */}
                  <div className="absolute top-1/4 right-1/4 h-1 w-1/4 bg-gray-600 rotate-45"></div>
                  <div className="absolute bottom-1/4 right-1/4 h-1 w-1/4 bg-gray-600 -rotate-45"></div>
                  <div className="absolute bottom-1/4 left-1/4 h-1 w-1/4 bg-gray-600 rotate-45"></div>
                  <div className="absolute top-1/4 left-1/4 h-1 w-1/4 bg-gray-600 -rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Core Capabilities */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-12">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Core Capabilities of AI Actors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced functionalities that enable intelligent agent behavior
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Capability 1: Learning */}
            <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Adaptive Learning</h3>
                <div className="h-10 w-10 rounded-full bg-black"></div>
              </div>
              <p className="text-gray-600">
                Agents continuously improve performance through reinforcement learning, 
                updating strategies based on outcomes and environmental changes.
              </p>
              <div className="pt-4">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-black"></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Learning Progress</div>
              </div>
            </div>
            
            {/* Capability 2: Collaboration */}
            <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Multi-Agent Coordination</h3>
                <div className="h-10 w-10 rounded-full bg-black"></div>
              </div>
              <p className="text-gray-600">
                Multiple agents work together using communication protocols, 
                sharing information and distributing tasks for collective goals.
              </p>
              <div className="pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full bg-gray-800 border-2 border-white"></div>
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-2">Agent Network</div>
              </div>
            </div>
            
            {/* Capability 3: Reasoning */}
            <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Causal Reasoning</h3>
                <div className="h-10 w-10 rounded-full bg-black"></div>
              </div>
              <p className="text-gray-600">
                Understand cause-effect relationships, predict consequences of actions, 
                and make decisions based on logical inference chains.
              </p>
              <div className="pt-4">
                <div className="space-y-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-2 w-3/4 bg-gray-200 rounded-full"></div>
                  <div className="h-2 w-1/2 bg-gray-200 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Reasoning Depth</div>
              </div>
            </div>
            
            {/* Capability 4: Autonomy */}
            <div className="space-y-6 p-8 bg-white rounded-2xl border border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Goal-Oriented Autonomy</h3>
                <div className="h-10 w-10 rounded-full bg-black"></div>
              </div>
              <p className="text-gray-600">
                Operate independently toward objectives, making real-time adjustments 
                without human intervention while staying within defined constraints.
              </p>
              <div className="pt-4">
                <div className="h-8 w-8 rounded-full border-4 border-black animate-spin-slow mx-auto"></div>
                <div className="text-sm text-gray-500 mt-2 text-center">Autonomous Operation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Use Cases */}
      <section className="bg-black text-white py-24">
        <div className="mx-auto max-w-6xl px-12">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold">
              Real-World Applications
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              How autonomous agents transform industries and solve complex problems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Use Case 1 */}
            <div className="space-y-6 p-8 bg-gray-900 rounded-2xl">
              <h3 className="text-2xl font-bold">Supply Chain Optimization</h3>
              <p className="text-gray-300">
                Autonomous agents manage inventory, predict demand, and optimize 
                logistics routes in real-time, reducing costs and improving efficiency.
              </p>
              <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl"></div>
            </div>
            
            {/* Use Case 2 */}
            <div className="space-y-6 p-8 bg-gray-900 rounded-2xl">
              <h3 className="text-2xl font-bold">Financial Trading</h3>
              <p className="text-gray-300">
                AI agents analyze market data, execute trades, and manage portfolios 
                autonomously, adapting to market conditions and minimizing risks.
              </p>
              <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl"></div>
            </div>
            
            {/* Use Case 3 */}
            <div className="space-y-6 p-8 bg-gray-900 rounded-2xl">
              <h3 className="text-2xl font-bold">Smart Infrastructure</h3>
              <p className="text-gray-300">
                Coordinated agents manage energy grids, traffic systems, and 
                environmental controls, optimizing resource allocation dynamically.
              </p>
              <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl text-center space-y-12 px-12">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-gray-900">
              Start Building with AI Actors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Implement autonomous decision-making systems in your organization 
              with our agentic modeling platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="rounded-lg bg-black px-10 py-4 text-xl font-semibold text-white transition hover:bg-gray-900">
              Get Started Free
            </button>
            <button className="rounded-lg border-2 border-black px-10 py-4 text-xl font-semibold transition hover:bg-black hover:text-white">
              Schedule Demo
            </button>
          </div>
          
          <div className="pt-12 border-t border-gray-200">
            <p className="text-gray-500">
              Already have agents? <span className="text-black font-semibold">Explore advanced features →</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}