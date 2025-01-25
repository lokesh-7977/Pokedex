"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "@/services/pokemon-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  Heart,
  Zap,
  Shield,
  Crosshair,
  Feather,
  Swords,
  Star,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePokemonStore } from "@/store/pokemon-store"; // Import Zustand store
import { LoadingSkeleton } from "@/constants/loader";
import { ErrorMessage } from "@/constants/error";
import { Colors } from "@/constants/colors";
import { InfoCard } from "../_components/info-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX, useEffect, useState } from "react";

const statIcons: { [key: string]: JSX.Element } = {
  hp: <Heart className="w-5 h-5 text-red-500" />,
  attack: <Swords className="w-5 h-5 text-orange-500" />,
  defense: <Shield className="w-5 h-5 text-yellow-500" />,
  "special-attack": <Zap className="w-5 h-5 text-purple-500" />,
  "special-defense": <Feather className="w-5 h-5 text-green-500" />,
  speed: <Star className="w-5 h-5 text-blue-500" />,
};

const PokemonDetail: React.FC = () => {
  const { pokemonId, pokemon, setPokemon, setLoading, setError } =
    usePokemonStore();

  const id =
    pokemonId ||
    (typeof window !== "undefined"
      ? window.location.pathname.split("/").pop() || ""
      : "");

  const {
    data: fetchedPokemon,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["pokemonDetails", id],
    queryFn: () => fetchPokemonDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (fetchedPokemon) {
      setPokemon(fetchedPokemon); // Directly set the fetched data in Zustand store
    }
    if (fetchError) {
      setError(fetchError.message); // Set the error message in Zustand store
    }
    setLoading(isLoading); // Set loading state
  }, [fetchedPokemon, fetchError, isLoading, setPokemon, setError, setLoading]);

  if (isLoading) return <LoadingSkeleton />;
  if (fetchError || !pokemon)
    return <ErrorMessage message="Pokémon not found or an error occurred!" />;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Pokémon List
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle className="text-4xl font-extrabold capitalize text-center">
              {pokemon.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <Image
                    src={
                      pokemon.sprites.front_default ||
                      pokemon.sprites.back_default ||
                      "/"
                    }
                    alt={`${pokemon.name} view`}
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg mx-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                    <TabsTrigger value="moves">Moves</TabsTrigger>
                  </TabsList>
                  <TabsContent value="info">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <InfoCard title="Height & Weight">
                        <p className="text-lg">
                          Height: {pokemon.height / 10} m
                        </p>
                        <p className="text-lg">
                          Weight: {pokemon.weight / 10} kg
                        </p>
                      </InfoCard>
                      <InfoCard title="Types">
                        <div className="flex flex-wrap gap-2">
                          {pokemon.types.map(
                            (type: { type: { name: string } }) => (
                              <Badge
                                key={type.type.name}
                                className={`${
                                  Colors[type.type.name] || "bg-gray-500"
                                } text-white capitalize px-3 py-1`}
                              >
                                {type.type.name}
                              </Badge>
                            )
                          )}
                        </div>
                      </InfoCard>
                    </div>
                    <InfoCard title="Abilities" className="mt-6">
                      <ul className="list-disc list-inside space-y-1">
                        {pokemon.abilities.map(
                          (ability: { ability: { name: string } }) => (
                            <li
                              key={ability.ability.name}
                              className="text-lg capitalize"
                            >
                              {ability.ability.name.replace("-", " ")}
                            </li>
                          )
                        )}
                      </ul>
                    </InfoCard>
                  </TabsContent>
                  <TabsContent value="stats">
                    <InfoCard title="Stats">
                      <div className="grid grid-cols-2 gap-4">
                        {Array.isArray(pokemon.stats) &&
                          pokemon.stats.map(
                            (stat: {
                              stat: { name: string };
                              base_stat: number;
                            }) => (
                              <TooltipProvider key={stat.stat.name}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <motion.div
                                      className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      {statIcons[stat.stat.name] || (
                                        <Crosshair className="w-5 h-5 text-gray-500" />
                                      )}
                                      <div className="flex-1">
                                        <div className="text-sm font-medium capitalize">
                                          {stat.stat.name.replace("-", " ")}
                                        </div>
                                        <div className="text-2xl font-bold">
                                          {stat.base_stat}
                                        </div>
                                      </div>
                                    </motion.div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Base stat: {stat.base_stat}</p>
                                    <p>Max: 255</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )
                          )}
                      </div>
                    </InfoCard>
                  </TabsContent>
                  <TabsContent value="moves">
                    <InfoCard title="Moves">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {pokemon.moves
                          .slice(0, 20)
                          .map((move: { move: { name: string } }) => (
                            <motion.div
                              key={move.move.name}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge
                                variant="outline"
                                className="capitalize w-full justify-center"
                              >
                                {move.move.name.replace("-", " ")}
                              </Badge>
                            </motion.div>
                          ))}
                      </div>
                    </InfoCard>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
};

export default PokemonDetail;
