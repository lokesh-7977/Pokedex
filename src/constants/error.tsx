import { Card, CardContent } from "@/components/ui/card";

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="container mx-auto px-4 py-8">
    <Card>
      <CardContent className="p-6">
        <p className="text-center text-xl text-red-500">{message}</p>
      </CardContent>
    </Card>
  </div>
)