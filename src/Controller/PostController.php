<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Yaml\Yaml;

class PostController extends AbstractController
{
    const DATA_FOLDER = __DIR__ . '/../../posts';

    public function hello_world(Request $request): Response
    {
        $routes = Yaml::parseFile("../config/routes.yaml");
        $metadata = $routes[$request->attributes->get('_route')]['options']['metadata'];
        $content = file_get_contents(self::DATA_FOLDER . '/hello-world.md');

        return $this->render('post.html.twig', [
            'title' => $metadata['title'],
            'description' => $metadata['description'],
            'content' => $content,
        ]);
    }
}
