import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PokemonLoader() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  export const LoadingSkeleton: React.FC = () => (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-2/3 mx-auto" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <Skeleton className="w-full md:w-1/3 h-64 rounded-lg" />
            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
              </div>
              <Skeleton className="h-40 rounded-lg" />
              <Skeleton className="h-32 rounded-lg" />
              <Skeleton className="h-48 rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )