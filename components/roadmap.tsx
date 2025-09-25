"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Rocket } from "lucide-react"

const baconJourney = [
  {
    phase: "Phase 1",
    title: "The Great Bacon Awakening",
    status: "completed",
    items: [
      "Discovered bacon tastes better with Bitcoin",
      "Convinced our grandma this isn't just a phase",
      "Successfully wrapped first Bitcoin in bacon",
      "Learned that 'HODL' sounds like 'SIZZLE' backwards",
    ],
  },
  {
    phase: "Phase 2",
    title: "Bacon Meets Blockchain",
    status: "in-progress",
    items: [
      "Teaching Bitcoin to appreciate bacon seasoning",
      "Developing bacon-scented computer screens",
      "Training hamsters to mine crypto while cooking bacon",
      "Establishing diplomatic relations with breakfast foods",
    ],
  },
  {
    phase: "Phase 3",
    title: "The Bacon Revolution",
    status: "upcoming",
    items: [
      "Launch bacon-powered rocket to the moon",
      "Convince Elon Musk to accept bacon as payment",
      "Open first bacon-themed crypto exchange",
      "Achieve world peace through shared love of bacon",
    ],
  },
  {
    phase: "Phase 4",
    title: "Bacon Singularity",
    status: "upcoming",
    items: [
      "Merge with the bacon multiverse",
      "Become the official breakfast of Mars",
      "Solve world hunger with infinite bacon algorithm",
      "Retire to a bacon farm in the metaverse",
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "in-progress":
      return <Clock className="h-5 w-5 text-primary" />
    default:
      return <Rocket className="h-5 w-5 text-muted-foreground" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>
    case "in-progress":
      return <Badge className="bg-primary/10 text-primary border-primary/20">In Progress</Badge>
    default:
      return <Badge variant="outline">Upcoming</Badge>
  }
}

export function Roadmap() {
  return (
    <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Our <span className="text-primary">Bacon Journey</span> to Glory
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            From humble breakfast beginnings to crypto greatness - here's our completely serious plan!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {baconJourney.map((item, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg transition-all duration-300 ${
                item.status === "in-progress" ? "ring-2 ring-primary/20 bg-primary/5" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-sm">
                    {item.phase}
                  </Badge>
                  {getStatusIcon(item.status)}
                </div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {item.title}
                  {getStatusBadge(item.status)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {item.items.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          item.status === "completed"
                            ? "bg-green-500"
                            : item.status === "in-progress"
                              ? "bg-primary"
                              : "bg-muted-foreground"
                        }`}
                      />
                      <span className="text-sm text-muted-foreground">{task}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
